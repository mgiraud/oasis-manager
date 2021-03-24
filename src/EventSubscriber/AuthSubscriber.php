<?php


namespace App\EventSubscriber;


use App\Entity\RefreshToken;
use App\Manager\RefreshTokenManager;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;
    private RefreshTokenManager $refreshTokenManager;
    private string $env;

    public function __construct(
        EntityManagerInterface $em,
        RefreshTokenManager $refreshTokenManager,
        string $env
    ) {
        $this->em = $em;
        $this->refreshTokenManager = $refreshTokenManager;
        $this->env = $env;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => [
                ['attachRefreshToken'],
            ],
        ];
    }

    public function attachRefreshToken(AuthenticationSuccessEvent $event)
    {
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $refreshTokenString = $this->refreshTokenManager->getRefreshTokenString();
        if (null !== $refreshTokenString) {
            $this->refreshTokenManager->removeOldRefreshToken($refreshTokenString);
        }

        $valid = new \DateTime('+' . \App\Entity\RefreshToken::REFRESH_TOKEN_TTL .' seconds');
        $refreshToken = new RefreshToken($user->getUsername(), $valid);
        $this->em->persist($refreshToken);
        $this->em->flush();

        $event->getResponse()->headers->setCookie(
            (new Cookie(RefreshToken::REFRESH_TOKEN_PARAM_NAME, $refreshToken->getRefreshToken(), 0, '/'))
                ->withSecure($this->env !== 'dev')
        );
    }
}