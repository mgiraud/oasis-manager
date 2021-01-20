<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Member;
use App\Entity\Page;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class PageSubscriber implements EventSubscriberInterface
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
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

        $page = $event->getControllerResult();
        if (!$page instanceof Page) {
            return;
        }

        $user = $this->security->getUser();
        if (!$user instanceof Member) {
            return;
        }

        $page->setCreatedBy($user);
    }
}