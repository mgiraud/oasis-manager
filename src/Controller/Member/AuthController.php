<?php


namespace App\Controller\Member;


use App\Entity\RefreshToken;
use App\Manager\RefreshTokenManager;
use App\Security\Authenticator\RefreshTokenAuthenticator;
use App\Security\Provider\RefreshTokenProvider;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationFailureHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class AuthController extends AbstractController
{
    /**
     * @Route("/api/logout")
     */
    public function logout(Request $request)
    {
        $response = new Response();
        $response->headers->setCookie(
            (new Cookie('BEARER', null, 0, '/'))
                ->withSecure($this->getParameter('kernel.environment') !== 'dev')
        );
        $response->headers->setCookie(
            (new Cookie('REFRESH', null, 0, '/'))
                ->withSecure($this->getParameter('kernel.environment') !== 'dev')
        );

        return $response;
    }

    /**
     * @Route("/api/refresh")
     */
    public function refresh(
        Request $request,
        RefreshTokenManager $refreshTokenManager,
        RefreshTokenAuthenticator $authenticator,
        RefreshTokenProvider $provider,
        AuthenticationSuccessHandler $successHandler,
        AuthenticationFailureHandler $failureHandler
    ) {
        $credentials = $authenticator->getCredentials($request);
        try {
            $user = $authenticator->getUser($credentials, $provider);
            $postAuthenticationToken = $authenticator->createAuthenticatedToken($user, 'users');
        } catch (AuthenticationException $e) {
            return $failureHandler->onAuthenticationFailure($request, $e);
        }
        $refreshToken = $refreshTokenManager->getRefreshTokenFromString($credentials['token']);

        if (!$refreshToken instanceof RefreshToken || !$refreshToken->isValid()) {
            return $failureHandler->onAuthenticationFailure($request, new AuthenticationException(
                sprintf('Refresh token "%s" is invalid.', $refreshToken)
            ));
        }

        return $successHandler->onAuthenticationSuccess($request, $postAuthenticationToken);
    }
}