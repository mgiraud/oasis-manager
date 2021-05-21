<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\PageLog;
use App\Entity\Member;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class PageLogSubscriber implements EventSubscriberInterface
{
    private Security $security;
    private EntityManagerInterface $manager;

    public function __construct(Security $security, EntityManagerInterface $manager)
    {
        $this->security = $security;
        $this->manager = $manager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['beforePageValidated', EventPriorities::PRE_VALIDATE],
            ]
        ];
    }

    public function beforePageValidated(ViewEvent $event)
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return;
        }

        $blogArticle = $event->getControllerResult();
        if (!$blogArticle instanceof PageLog) {
            return;
        }

        $user = $this->security->getUser();
        if (!$user instanceof Member) {
            return;
        }

        $this->manager->getConnection()->executeQuery('
            DELETE FROM page_log WHERE id IN (
                SELECT id from page_log p2 
                WHERE draft = TRUE
                ORDER BY updated_at DESC 
                OFFSET :nbLogPerPage
            )
        ', [
            'nbLogPerPage' => PageLog::DRAFT_LOGS_PER_PAGE - 1
        ]);

        $blogArticle->setUpdatedBy($user);
    }
}
