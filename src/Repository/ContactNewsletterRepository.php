<?php

namespace App\Repository;

use App\Entity\ContactNewsletter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ContactNewsletter|null find($id, $lockMode = null, $lockVersion = null)
 * @method ContactNewsletter|null findOneBy(array $criteria, array $orderBy = null)
 * @method ContactNewsletter[]    findAll()
 * @method ContactNewsletter[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContactNewsletterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContactNewsletter::class);
    }

    // /**
    //  * @return ContactNewsletter[] Returns an array of ContactNewsletter objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ContactNewsletter
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
