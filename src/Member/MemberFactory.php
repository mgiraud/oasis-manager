<?php


namespace App\Member;


use App\Entity\Member;
use App\Entity\MemberGroup;
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
        array $permissions,
        array $roles,
        array $groups
    ): Member {
        $user = new Member();
        $user->email = $email;
        $user->nickname = $nickname;
        $user->password = $this->encoder->getEncoder(Member::class)->encodePassword(
            $password,
            null
        );
        $user->setPermissions($permissions);
        $user->roles = array_merge($roles);
        /** @var MemberGroup $group */
        foreach ($groups as $group) {
            $user->addGroup($group);
        }
        $user->setStatus(Member::STATUS_OPEN);

        return $user;
    }
}