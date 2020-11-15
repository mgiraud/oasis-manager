<?php


namespace App\Controller\Member;


use App\Entity\Member;
use Doctrine\ORM\EntityManagerInterface;

class CloseAction
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(Member $data): Member
    {
        $data->setStatus(Member::STATUS_CLOSED);
        $this->em->flush();

        return $data;
    }
}