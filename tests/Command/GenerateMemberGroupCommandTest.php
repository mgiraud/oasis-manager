<?php


namespace App\Tests\Command;


use App\Entity\Member;
use App\Entity\MemberGroup;
use App\Tests\FixtureAwareTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;

class GenerateMemberGroupCommandTest extends FixtureAwareTestCase
{
    public function setUp(): void
    {
        $this->loadFixtures([]);
    }

    public function testExecute()
    {
        $kernel = static::createKernel();
        $application = new Application($kernel);

        $command = $application->find('app:member-group:generate');
        $commandTester = new CommandTester($command);
        $commandTester->execute([
            'name' => 'group name',
            'description' => 'group name decription',
        ]);

        /** @var MemberGroup $group */
        $group = self::$container->get('doctrine.orm.entity_manager')->getRepository(MemberGroup::class)->findOneBy([
            'name' => 'group name'
        ]);

        $this->assertNotNull($group);
    }
}