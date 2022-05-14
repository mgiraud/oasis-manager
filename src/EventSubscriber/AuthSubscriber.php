<?php


namespace App\EventSubscriber;


use App\Entity\RefreshToken;
use App\Manager\RefreshTokenManager;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;
    private RefreshTokenManager $refreshTokenManager;
    private JWTTokenManagerInterface $tokenManager;
    private string $env;
    private string $domain;

    public function __construct(
        EntityManagerInterface $em,
        RefreshTokenManager $refreshTokenManager,
        JWTTokenManagerInterface $tokenManager,
        string $env,
        string $domain
    ) {
        $this->em = $em;
        $this->refreshTokenManager = $refreshTokenManager;
        $this->tokenManager = $tokenManager;
        $this->env = $env;
        $this->domain = $domain;
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
            $refreshToken = $this->refreshTokenManager->getRefreshTokenFromString($refreshTokenString);
            if ($refreshToken->isValid()) {
                $event->getResponse()->headers->setCookie(
                    (new Cookie(RefreshToken::REFRESH_TOKEN_PARAM_NAME, $refreshTokenString, 0, '/', $this->domain))
                        ->withSecure()
                );
                return;
            } else {
                $this->refreshTokenManager->removeOldRefreshToken($refreshTokenString);
            }
        }

        $valid = new \DateTimeImmutable('+' . RefreshToken::REFRESH_TOKEN_TTL .' seconds');
        $refreshToken = new RefreshToken($user->getUsername(), $valid);
        $refreshToken->setRefreshToken($this->tokenManager->createFromPayload($user, [
            'exp' => $valid
        ]));
        $this->em->persist($refreshToken);
        $this->em->flush();

        $event->getResponse()->headers->setCookie(
            (new Cookie(RefreshToken::REFRESH_TOKEN_PARAM_NAME, $refreshToken->getRefreshToken(), 0, '/', $this->domain))
                ->withSecure()
        );
    }
}
