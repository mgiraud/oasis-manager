<?php

namespace App\Repository;

use App\Entity\MediaGalleryItemParent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MediaGalleryItemParent|null find($id, $lockMode = null, $lockVersion = null)
 * @method MediaGalleryItemParent|null findOneBy(array $criteria, array $orderBy = null)
 * @method MediaGalleryItemParent[]    findAll()
 * @method MediaGalleryItemParent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaGalleryItemParentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MediaGalleryItemParent::class);
    }
}
