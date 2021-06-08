<?php


namespace App\Controller\Media;


use App\Entity\MediaGallery;
use Doctrine\ORM\EntityManagerInterface;

class MediaGalleryTreeAction
{
    public function __invoke(EntityManagerInterface $manager): array
    {
        return $manager->getRepository(MediaGallery::class)->findAll();;
    }
}