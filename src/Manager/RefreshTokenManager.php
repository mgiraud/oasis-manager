<?php


namespace App\Manager;


use App\Entity\RefreshToken;
use App\Repository\RefreshTokenRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class RefreshTokenManager
{
    private RequestStack $requestStack;
    private EntityManagerInterface $em;
    private RefreshTokenRepository $repository;

    public function __construct(RequestStack $requestStack, EntityManagerInterface $em)
    {
        $this->requestStack = $requestStack;
        $this->em = $em;
        $this->repository = $this->em->getRepository(RefreshToken::class);
    }

    public function getRefreshTokenString(): ?string
    {
        $request = $this->requestStack->getCurrentRequest();
        return $request->cookies->get('REFRESH');
    }

    public function getRefreshTokenFromString(?string $refreshTokenString): ?RefreshToken
    {
        if ($refreshTokenString === null) {
            return null;
        }
        return $this->repository->findOneBy([
            'refreshToken' => $refreshTokenString
        ]);
    }

    public function removeOldRefreshToken(string $refreshTokenString)
    {
        $refreshToken = $this->getRefreshTokenFromString($refreshTokenString);

        if ($refreshToken instanceof RefreshToken) {
            $this->em->remove($refreshToken);
            $this->em->flush();
        }
    }

    public function revokeAllInvalid($datetime = null)
    {
        $invalidTokens = $this->repository->findInvalid($datetime);

        foreach ($invalidTokens as $invalidToken) {
            $this->em->remove($invalidToken);
        }

        $this->em->flush();

        return $invalidTokens;
    }
}