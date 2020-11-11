<?php


namespace App\Tests\Command;


use App\Entity\Member;
use App\Tests\FixtureAwareTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;

class GenerateUserCommandTest extends FixtureAwareTestCase
{
    public function setUp(): void
    {
        $this->loadFixtures([]);
    }

    public function testExecute()
    {
        $kernel = static::createKernel();
        $application = new Application($kernel);

        $command = $application->find('app:member:generate');
        $commandTester = new CommandTester($command);
        $commandTester->execute([
            'email' => 'test@example.com',
            'password' => 'test',
            'nickname' => 'test',
            '--roles' => ['ROLE_TEST', 'ROLE_TEST_2'],
        ]);
        $output = $commandTester->getDisplay();
        $this->assertStringContainsString('User successfully generated!', $output);

        $user = self::$container->get('doctrine.orm.entity_manager')->getRepository(Member::class)->findOneBy([
            'email' => 'test@example.com'
        ]);
        $this->assertNotNull($user);
        $this->assertNotContains('ROLE_ADMIN', $user->getRoles());
        $this->assertContains('ROLE_TEST', $user->getRoles());
        $this->assertContains('ROLE_TEST_2', $user->getRoles());
    }

    public function testExecuteAdmin()
    {
        $kernel = static::createKernel();
        $application = new Application($kernel);

        $command = $application->find('app:member:generate');
        $commandTester = new CommandTester($command);
        $commandTester->execute([
            'email' => 'test@example.com',
            'password' => 'test',
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