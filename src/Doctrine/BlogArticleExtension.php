<?php


namespace App\Doctrine;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\BlogArticle;
use App\Entity\Member;
use App\Security\Permissions;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class BlogArticleExtension implements QueryCollectionExtensionInterface
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
        if (BlogArticle::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN')) {
            return;
        }

        if (null === ($user = $this->security->getUser())
            || !$user instanceof Member
            || !$user->hasPermission(Permissions::USER_CAN_EDIT_BLOG_ARTICLES))
        {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.isPublished = TRUE', $rootAlias));

            return;
        }
    }

}
