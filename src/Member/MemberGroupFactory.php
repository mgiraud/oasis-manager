<?php


namespace App\Member;


use App\Entity\MemberGroup;

class MemberGroupFactory
{
    public function createFromCommand(
        string $name,
        string $description
    ): MemberGroup {
        $memberGroup = new MemberGroup();
        $memberGroup->setName($name);
        $memberGroup->setDescription($description);

        return $memberGroup;
    }
}