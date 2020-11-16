<?php


namespace App\DataFixtures;


use App\Entity\MemberGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MemberGroupFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $group = new MemberGroup();
        $group->setName('a simple group')
            ->setDescription('description of a simple group')
            ->setPermissions(['user.permission-group-1']);

        $manager->persist($group);
        $this->addReference('group-1', $group);
        $manager->flush();
    }
}