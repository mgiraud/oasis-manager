<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Member;
use App\Entity\Page;
use App\Entity\PageLog;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class PageSubscriber implements EventSubscriberInterface
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
                ['afterPageWritten', EventPriorities::POST_WRITE],
            ]
        ];
    }

    public function beforePageValidated(ViewEvent $event)
    {
        if (!$this->canWrite($event)) {
            return;
        }

        $page = $event->getControllerResult();
        $user = $this->security->getUser();
        $page->setCreatedBy($user);
    }

    public function afterPageWritten(ViewEvent $event)
    {
        if (!$this->canEdit($event)) {
            return;
        }
        /** @var Page $page */
        $page = $event->getControllerResult();
        /** @var Member $user */
        $user = $this->security->getUser();

        $this->manager->getConnection()->executeQuery('
            DELETE FROM page_log WHERE id IN (
                SELECT id from page_log p2 
                WHERE draft = FALSE
                ORDER BY updated_at DESC 
                OFFSET :nbLogPerPage
            )
        ', [
            'nbLogPerPage' => PageLog::LOGS_PER_PAGE - 1
        ]);

        $pageLog = new PageLog();
        $pageLog
            ->setUpdatedBy($user)
            ->setUpdatedAt(new \Datetime())
            ->setIsDraft(false)
            ->setOriginalContent($page->getContent())
            ->setPage($page)
        ;
        $this->manager->persist($pageLog);
        $this->manager->flush();
    }

    private function canEdit(ViewEvent $event): bool
    {
        if ('PUT' !== $event->getRequest()->getMethod()) {
            return false;
        }

        return $this->canUpdate($event);
    }

    private function canWrite(ViewEvent $event): bool
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return false;
        }

        return $this->canUpdate($event);
    }

    public function canUpdate(ViewEvent $event)
    {
        $page = $event->getControllerResult();
        if (!$page instanceof Page) {
            return false;
        }

        $user = $this->security->getUser();
        if (!$user instanceof Member) {
            return false;
        }

        return true;
    }
}
