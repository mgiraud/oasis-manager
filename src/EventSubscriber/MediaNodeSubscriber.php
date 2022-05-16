<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\MediaNode;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class MediaNodeSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['onMediaObjectWrite', EventPriorities::PRE_WRITE],
            ],
        ];
    }

    public function onMediaObjectWrite(ViewEvent $event) {
        if ($event->getRequest()->getMethod() !== 'DELETE') {
            return;
        }

        $mediaNode = $event->getControllerResult();
        if (!$mediaNode instanceof MediaNode) {
            return;
        }

        foreach ($mediaNode->getChildren() as $child) {
            $child->setParent($mediaNode->getParent() ?? null);
        }
    }
}
