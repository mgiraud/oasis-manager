<?php


namespace App\Tests\Command;


use App\DataFixtures\MemberGroupFixture;
use App\Entity\Member;
use App\Entity\MemberGroup;
use App\Tests\FixtureAwareTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;

class GenerateUserCommandTest extends FixtureAwareTestCase
{
    public function setUp(): void
    {
        $this->loadFixtures([
            MemberGroupFixture::class
        ]);
    }

    public function testExecuteSimple()
    {
        $kernel = static::createKernel();
        $application = new Application($kernel);

        $command = $application->find('app:member:generate');
        $commandTester = new CommandTester($command);
        $commandTester->setInputs(['test', '0', '0']);
        $commandTester->execute([
            'email' => 'test@example.com',
            'nickname' => 'test',
        ]);
        $output = $commandTester->getDisplay();
        $this->assertStringContainsString('User successfully generated!', $output);

        /** @var Member $user */
        $user = self::$container->get('doctrine.orm.entity_manager')->getRepository(Member::class)->findOneBy([
            'email' => 'test@example.com'
        ]);
        $this->assertNotNull($user);
        $this->assertNotContains('ROLE_ADMIN', $user->getRoles());
        $this->assertEmpty($user->getPermissions());
        $this->assertEmpty($user->getGroups());
    }

    public function testExecutePermissionAndGroup()
    {
        $kernel = static::createKernel();
        $application = new Application($kernel);

        $command = $application->find('app:member:generate');
        $commandTester = new CommandTester($command);
        /** @var MemberGroup $group */
        $group = $this->referenceRepository->getReference('group-1');
        $commandTester->setInputs(['test', '1,2,3', $group->getId()]);
        $commandTester->execute([
            'email' => 'test@example.com',
            'nickname' => 'test',
        ]);
        $output = $commandTester->getDisplay();
        $this->assertStringContainsString('User successfully generated!', $output);

        /** @var Member $user */
        $user = self::$container->get('doctrine.orm.entity_manager')->getRepository(Member::class)->findOneBy([
            'email' => 'test@example.com'
        ]);
        $this->assertNotNull($user);
        $this->assertNotEmpty($user->getPermissions());
        $this->assertNotEmpty($user->getGroups());
    }

    public function testExecuteAdmin()
    {
        $kernel = static::createKernel();
        $application = new Application($kernel);

        $command = $application->find('app:member:generate');
        $commandTester = new CommandTester($command);
        $commandTester->setInputs(['test', '0']);
        $commandTester->execute([
            'email' => 'test@example.com',
            'nickname' => 'test',
            '--is-admin' => 'true',
        ]);
        $output = $commandTester->getDisplay();
        $this->assertStringContainsString('User successfully generated!', $output);

        $user = self::$container->get('doctrine.orm.entity_manager')->getRepository(Member::class)->findOneBy([
            'email' => 'test@example.com'
        ]);
        $this->assertNotNull($user);
        $this->assertContains('ROLE_ADMIN', $user->getRoles());
    }
}