<?php


namespace App\Controller\BlogArticle;


use App\Entity\BlogArticle;
use App\Entity\Member;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetTagsAction extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(): array
    {
        $tagArrays = $this->em->getRepository(BlogArticle::class)->createQueryBuilder('a')
            ->select('a.tags')->getQuery()->getResult();

        $tags = [];
        foreach ($tagArrays as $tagArray) {
            if (is_array($tagArray['tags'])) {
                foreach ($tagArray['tags'] as $tag) {
                    if (!in_array($tag, $tags)) {
                        $tags[] = $tag;
                    }
                }
            }
        }

        return $tags;
    }
}