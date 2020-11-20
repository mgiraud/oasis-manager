<?php

namespace App\Repository;

use App\Entity\PageLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PageLog|null find($id, $lockMode = null, $lockVersion = null)
 * @method PageLog|null findOneBy(array $criteria, array $orderBy = null)
 * @method PageLog[]    findAll()
 * @method PageLog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PageLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PageLog::class);
    }
}
