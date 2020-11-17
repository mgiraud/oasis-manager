<?php


namespace App\Doctrine;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Member;
use App\Entity\Page;
use App\Security\Permissions;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class PageExtension implements QueryCollectionExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        if (Page::class !== $resourceClass
            || $this->security->isGranted('ROLE_ADMIN')
            || null === ($user = $this->security->getUser())
            || !$user instanceof Member) {
            return;
        }

        if (!$user->hasPermission(Permissions::USER_CAN_EDIT_PAGES)){
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.isPublished = FALSE', $rootAlias));
        }
    }

}