<?php


namespace App\Controller\Media;


use App\Entity\MediaNode;
use Doctrine\ORM\EntityManagerInterface;

class MediaNodeTreeAction
{
    public function __invoke(EntityManagerInterface $manager): array
    {
        return $manager->getRepository(MediaNode::class)->findBy([
            'parent' => null,
        ]);
    }
}