<?php


namespace App\Member;


use App\Entity\Member;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class MemberFactory
{
    protected EncoderFactoryInterface $encoder;

    public function __construct(EncoderFactoryInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function createFromCommand(
        string $email,
        string $password,
        string $nickname,
        array $roles = []
    ): Member {
        $user = new Member();
        $user->email = $email;
        $user->nickname = $nickname;
        $user->password = $this->encoder->getEncoder(Member::class)->encodePassword(
            $password,
            null
        );
        $user->roles = array_merge($roles, ['ROLE_READER']);

        return $user;
    }
}