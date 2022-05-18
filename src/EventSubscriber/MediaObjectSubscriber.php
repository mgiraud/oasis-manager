<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

class MediaObjectSubscriber implements EventSubscriberInterface
{
    private StorageInterface $storage;
    private EntityManagerInterface $em;

    public function __construct(StorageInterface $storage, EntityManagerInterface $em)
    {
        $this->storage = $storage;
        $this->em = $em;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['onMediaObjectDelete', EventPriorities::POST_WRITE],
                ['onMediaObjectCreate', EventPriorities::POST_WRITE],
            ],
        ];
    }

    public function onMediaObjectDelete(ViewEvent $event) {
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

    public function onMediaObjectCreate(ViewEvent $event)
    {
        if ($event->getRequest()->getMethod() !== 'POST'
            || $event->getRequest()->attributes->get('_api_collection_operation_name') !== 'post') {
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
        try {
            $file = new File($filePath);
            if (strpos($file->getMimeType(), 'image/') === false) {
                return;
            }
            foreach (MediaObject::IMG_SIZE as $name => $size) {
                $sizes = getimagesize($filePath);
                if ($sizes[0] < $size && $sizes[1] < $size) {
                    continue;
                }
                $imagick = new \Imagick(realpath($filePath));
                $imagick->thumbnailImage($size, $size, true, false);
                $thumbnailPath = str_replace($file->getBasename(), $file->getBasename() . '_thubmnail_' . $name, $filePath);
                $imagick->writeImage($thumbnailPath);

                $mediaThumbnail = new MediaObject();
                $mediaThumbnail->filePath = $file->getBasename() . '_thubmnail_' . $name;
                $mediaThumbnail->customName = ($mediaObject->customName ??  $mediaObject->uniqueId) . '_thumb_' . $name;
                $mediaThumbnail->original = $mediaObject;
                $mediaThumbnail->size = $name;
                $this->em->persist($mediaThumbnail);

                foreach ($mediaObject->getMediaNodes() as $mediaNode) {
                    $mediaNode->addMediaObject($mediaThumbnail);
                }
            }

            $this->em->flush();
        } catch (\Exception $e) {

        }

    }
}
