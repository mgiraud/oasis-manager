<?php


namespace App\Security\Provider;


use App\Entity\Member;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class RefreshTokenProvider implements UserProviderInterface
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function loadUserByUsername(string $email)
    {
        return $this->em->getRepository(Member::class)->findOneBy([
            'email' => $email
        ]);
    }

    public function refreshUser(UserInterface $user)
    {
        throw new UnsupportedUserException();
    }

    public function supportsClass(string $class)
    {
        return Member::class === $class;
    }

}