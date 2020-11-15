<?php


namespace App\DataFixtures;


use App\Entity\MediaGallery;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MediaGalleryFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $gallery = new MediaGallery();
        $gallery->setName('Default gallery');
        $gallery->setDescription('with a description');

        $manager->persist($gallery);
        $manager->flush();
    }

}