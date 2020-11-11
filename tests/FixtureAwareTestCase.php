<?php


namespace App\Tests;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\Loader\SymfonyFixturesLoader;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\Loader;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\Common\DataFixtures\ReferenceRepository;
use Psr\Container\ContainerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\AbstractBrowser;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class FixtureAwareTestCase extends WebTestCase
{
    /** @var ReferenceRepository */
    protected $referenceRepository;

    public function getContainer(): ContainerInterface
    {
        if (null === static::$kernel || null === static::$kernel->getContainer()) {
            $this->bootKernel([
                    'environment' => 'test',
                ]
            );
        }

        return static::$container;
    }

    private function loadDependentFixture(SymfonyFixturesLoader $doctrineLoader, SymfonyFixturesLoader $loader, FixtureInterface $fixture) {
        if ($fixture instanceof DependentFixtureInterface) {
            foreach ($fixture->getDependencies() as $dependentFixture) {
                $loadedDependentFixture = $doctrineLoader->getFixture($dependentFixture);
                if (!$loader->hasFixture($loadedDependentFixture)) {
                    $this->loadDependentFixture($doctrineLoader, $loader, $loadedDependentFixture);
                    $loader->addFixture($loadedDependentFixture);
                }
            }
        }
    }

    private function getFixtureLoader(array $classNames): Loader
    {
        $doctrineLoader = $this->getContainer()->get('doctrine.fixtures.loader');
        $loader = new SymfonyFixturesLoader($this->getContainer());
        foreach ($classNames as $className) {
            $fixture = $doctrineLoader->getFixture($className);
            $this->loadDependentFixture($doctrineLoader, $loader, $fixture);
            $loader->addFixture($fixture);
        }

        return $loader;
    }

    public function loadFixtures(array $fixtures): ReferenceRepository
    {
        $em = $this->getContainer()->get('doctrine')->getManager();
        $executor = new ORMExecutor($em, new ORMPurger($em));
        $executor->purge();
        $executor->execute($this->getFixtureLoader($fixtures)->getFixtures(), true);

        $this->referenceRepository = $executor->getReferenceRepository();
        return $this->referenceRepository;
    }

    protected function loginSso(AbstractBrowser $client, array $roles): AbstractBrowser
    {
        $client->setServerParameter('HTTP_HOST',
            $this->getContainer()->getParameter('bo_hostname')
        );

        $session = $client->getContainer()->get('session');
        $firewallContext = 'secured_area';

        $token = new UsernamePasswordToken('admin', null, $firewallContext, $roles);
        $session->set('_security_' . $firewallContext, serialize($token));
        $session->save();

        $cookie = new Cookie($session->getName(), $session->getId());
        $client->getCookieJar()->set($cookie);

        return $client;
    }

}