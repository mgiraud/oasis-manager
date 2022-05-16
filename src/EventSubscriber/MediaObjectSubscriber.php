<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\MediaObject;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

class MediaObjectSubscriber implements EventSubscriberInterface
{
    private StorageInterface $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['onMediaObjectWrite', EventPriorities::POST_WRITE],
            ],
        ];
    }

    public function onMediaObjectWrite(ViewEvent $event) {
        if ($event->getRequest()->getMethod() !== 'DELETE') {
            return;
        }

        $mediaObject = $event->getControllerResult();
        if (!$mediaObject instanceof MediaObject) {
            return;
        }

        $filePath = $this->storage->resolvePath($mediaObject);
        if ($filePath === null) {
            return;
        }
        @unlink($mediaObject->filePath);
    }
}
