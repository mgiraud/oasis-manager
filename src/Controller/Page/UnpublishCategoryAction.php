<?php


namespace App\Controller\Page;


use App\Entity\PageCategory;
use Doctrine\ORM\EntityManagerInterface;

class UnpublishCategoryAction
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(PageCategory $data): PageCategory
    {
        $data->setIsPublished(false);
        $this->em->flush();

        return $data;
    }
}