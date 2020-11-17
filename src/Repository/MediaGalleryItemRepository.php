<?php

namespace App\Repository;

use App\Entity\MediaGalleryItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MediaGalleryItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method MediaGalleryItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method MediaGalleryItem[]    findAll()
 * @method MediaGalleryItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaGalleryItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MediaGalleryItem::class);
    }
}
