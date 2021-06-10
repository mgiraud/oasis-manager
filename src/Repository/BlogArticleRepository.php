<?php

namespace App\Repository;

use App\Entity\BlogArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method BlogArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method BlogArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method BlogArticle[]    findAll()
 * @method BlogArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BlogArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BlogArticle::class);
    }
}
