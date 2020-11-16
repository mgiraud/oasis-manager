<?php


namespace App\Security\Voter;


use App\Entity\Member;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class BackendAccesVoter extends Voter
{
    protected function supports(string $attribute, $subject)
    {
        return \is_string($attribute) && 0 === strncmp($attribute, 'user.', 4);
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if (!$user instanceof Member) {
            return false;
        }

        return $user->hasPermission($attribute);
    }

}