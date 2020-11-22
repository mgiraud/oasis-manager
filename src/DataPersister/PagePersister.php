<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Member;
use App\Entity\Page;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

final class PagePersister implements ContextAwareDataPersisterInterface
{
    private $security;
    private $entityManager;

    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Page;
    }

    /**
     * @param Page $data
     */
    public function persist($data, array $context = [])
    {
        if (!($user = $this->security->getUser()) instanceof Member) {
            return $data;
        }

        $data->setCreatedBy($user);
        // call your persistence layer to save $data
        $this->entityManager->persist($data);
        $this->entityManager->flush();
        return $data;
    }

    public function remove($data, array $context = [])
    {
        // call your persistence layer to delete $data
    }
}