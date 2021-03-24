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
}
