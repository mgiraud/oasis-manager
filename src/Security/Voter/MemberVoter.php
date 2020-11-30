<?php


namespace App\Security\Voter;


use App\Entity\Member;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class MemberVoter extends Voter
{
    protected function supports(string $attribute, $subject)
    {
        $supportsAttribute = in_array($attribute, ['MEMBER_EDIT']);
        $supportsSubject = $subject instanceof Member;

        return $supportsAttribute && $supportsSubject;
    }

    /** @param Member $subject */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        if (!$subject->getIsAdmin()) {
            return true;
        }
        $user = $token->getUser();

        return $user instanceof Member && $user->getIsAdmin();
    }

}