<?php


namespace App\Controller\Member;


use App\Entity\Member;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetMeAction extends AbstractController
{
    public function __invoke(): Member
    {
        /** @var Member $member */
        $member = $this->getUser();

        return $member;
    }
}