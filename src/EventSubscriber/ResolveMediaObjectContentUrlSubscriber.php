<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\MediaObject;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Vich\UploaderBundle\Storage\StorageInterface;

class ResolveMediaObjectContentUrlSubscriber implements EventSubscriberInterface
{
    private RouterInterface $router;
    private StorageInterface $storage;

    public function __construct(RouterInterface $router, StorageInterface $storage)
    {
        $this->router = $router;
        $this->storage = $storage;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
            return;
        }

        if (!($attributes = RequestAttributesExtractor::extractAttributes($request)) || !\is_a($attributes['resource_class'], MediaObject::class, true)) {
            return;
        }

        $mediaObjects = $controllerResult;

        if (!is_iterable($mediaObjects)) {
            $mediaObjects = [$mediaObjects];
        }

        foreach ($mediaObjects as $mediaObject) {
            if (!$mediaObject instanceof MediaObject) {
                continue;
            }

            $mediaObject->contentUrl = $this->router->generate('app_media_mediaobject_download', [
                'mediaId' => $mediaObject->uniqueId,
                'inline' => '1'
            ], UrlGeneratorInterface::ABSOLUTE_URL);

            $mediaObject->isImage = $this->checkFileIsImage($mediaObject);
        }
    }

    private function checkFileIsImage(MediaObject $mediaObject): bool
    {
        $filePath = $this->storage->resolvePath($mediaObject);
        if ($filePath === null) {
            return false;
        }

        $file = new File($filePath);

        return strpos($file->getMimeType(), 'image/') !== false;
    }
}