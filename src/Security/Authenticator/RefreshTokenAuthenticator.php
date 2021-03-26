<?php


namespace App\Security\Authenticator;


use App\Entity\Member;
use App\Entity\RefreshToken;
use App\Manager\RefreshTokenManager;
use App\Security\Provider\RefreshTokenProvider;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class RefreshTokenAuthenticator extends AbstractGuardAuthenticator
{
    private UserCheckerInterface $userChecker;
    private RefreshTokenManager $refreshTokenManager;

    public function __construct(UserCheckerInterface $userChecker,RefreshTokenManager $refreshTokenManager)
    {
        $this->userChecker = $userChecker;
        $this->refreshTokenManager = $refreshTokenManager;
    }

    public function supports(Request $request)
    {
        return $this->refreshTokenManager->getRefreshTokenString() !== null;
    }

    public function getCredentials(Request $request)
    {
        return [
            'token' => $this->refreshTokenManager->getRefreshTokenString()
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if (!$userProvider instanceof RefreshTokenProvider) {
            throw new \InvalidArgumentException(sprintf('The user provider must be an instance of RefreshTokenProvider (%s was given).', get_class($userProvider)));
        }

        $refreshTokenString = $credentials['token'];
        $refreshToken = $this->refreshTokenManager->getRefreshTokenFromString($refreshTokenString);

        if (!$refreshToken instanceof RefreshToken) {
            throw new AuthenticationException(sprintf('Refresh token "%s" does not exist.', $refreshTokenString));
        }

        $user = $userProvider->loadUserByUsername($refreshToken->getEmail());

        if (!$user instanceof Member) {
            throw new AuthenticationException(sprintf('User with refresh token "%s" does not exist.', $refreshTokenString));
        }

        $this->userChecker->checkPreAuth($user);
        $this->userChecker->checkPostAuth($user);

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new Response('Refresh token authentication failed.', 403);
    }

    public function onAuthenticationSuccess(
        Request $request,
        TokenInterface $token,
        string $providerKey
    ) {
        return null;
    }

    public function supportsRememberMe()
    {
        return false;
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = [
            // you might translate this message
            'message' => 'Authentication Required',
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}