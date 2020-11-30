<?php


namespace App\Security\Voter;


use App\Entity\Member;
use App\Security\Permissions;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class BackendAccessVoter extends Voter
{
    protected function supports(string $attribute, $subject)
    {
        $permissions = Permissions::getPermissions();
        return in_array($attribute, $permissions);
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