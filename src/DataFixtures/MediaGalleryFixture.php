<?php


namespace App\DataFixtures;


use App\Entity\MediaGallery;
use App\Entity\MediaGalleryItem;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;

class MediaGalleryFixture extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager)
    {
        $gallery = new MediaGallery();
        $gallery->setName('Fichiers téléversés');
        $gallery->setDescription('Ensemble ces fichiers téléversés');
        $manager->persist($gallery);

        $galleryItem = new MediaGalleryItem();
        $galleryItem
            ->setName('Racine')
            ->setDescription('Racine des fichiers uploadés')
            ->setGallery($gallery);
        $manager->persist($galleryItem);

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return [
            'gallery'
        ];
    }
}