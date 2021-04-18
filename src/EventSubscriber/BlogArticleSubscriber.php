<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\BlogArticle;
use App\Entity\Member;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class BlogArticleSubscriber implements EventSubscriberInterface
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

        $blogArticle = $event->getControllerResult();
        if (!$blogArticle instanceof BlogArticle) {
            return;
        }

        $user = $this->security->getUser();
        if (!$user instanceof Member) {
            return;
        }

        $blogArticle->setCreatedBy($user);
    }
}