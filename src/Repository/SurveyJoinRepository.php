<?php

namespace App\Repository;

use App\Entity\SurveyJoin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SurveyJoin|null find($id, $lockMode = null, $lockVersion = null)
 * @method SurveyJoin|null findOneBy(array $criteria, array $orderBy = null)
 * @method SurveyJoin[]    findAll()
 * @method SurveyJoin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SurveyJoinRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SurveyJoin::class);
    }

    // /**
    //  * @return SurveyJoin[] Returns an array of SurveyJoin objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SurveyJoin
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
