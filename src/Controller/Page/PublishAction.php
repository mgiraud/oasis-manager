<?php


namespace App\Controller\Page;


use App\Entity\Page;
use Doctrine\ORM\EntityManagerInterface;

class PublishAction
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(Page $data): Page
    {
        $data->setIsPublished(true);
        $this->em->flush();

        return $data;
    }
}