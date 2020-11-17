<?php

namespace App\Repository;

use App\Entity\MemberGroup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MemberGroup|null find($id, $lockMode = null, $lockVersion = null)
 * @method MemberGroup|null findOneBy(array $criteria, array $orderBy = null)
 * @method MemberGroup[]    findAll()
 * @method MemberGroup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MemberGroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MemberGroup::class);
    }
}
