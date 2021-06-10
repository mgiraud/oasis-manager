<?php

namespace App\Repository;

use App\Entity\MediaNode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MediaNode|null find($id, $lockMode = null, $lockVersion = null)
 * @method MediaNode|null findOneBy(array $criteria, array $orderBy = null)
 * @method MediaNode[]    findAll()
 * @method MediaNode[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaNodeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MediaNode::class);
    }
}
