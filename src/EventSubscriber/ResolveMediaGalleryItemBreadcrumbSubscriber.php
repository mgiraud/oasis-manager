<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\MediaGallery;
use App\Entity\MediaGalleryItem;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ResolveMediaGalleryItemBreadcrumbSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    private function getBreadcrumbForMediaGalleryItem(MediaGalleryItem $item): array
    {
        $breadcrumb = [];
        while ($item->getParent() instanceof MediaGalleryItem) {
            array_unshift($breadcrumb, [
                '@id' => '/api/media_gallery_items/' . $item->getId(),
                'name' => $item->getName(),
                'type' => 'item'
            ]);
            $item = $item->getParent();
        }
        if ($item->getGallery() instanceof MediaGallery) {
            array_unshift($breadcrumb,
                [
                    // TODO Dirty
                    '@id' => '/api/media_galleries/' . $item->getGallery()->getId(),
                    'name' => $item->getGallery()->getName(),
                    'type' => 'gallery'
                ]
            );
        }
        return $breadcrumb;
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond',
                true
            )) {
            return;
        }

        if (!($attributes = RequestAttributesExtractor::extractAttributes($request
            )) || !\is_a($attributes['resource_class'], MediaGalleryItem::class, true)) {
            return;
        }

        $objects = $controllerResult;

        if (!is_iterable($objects)) {
            $objects = [$objects];
        }

        foreach ($objects as $object) {
            if ($object instanceof MediaGalleryItem) {
                $object->breadcrumb = $this->getBreadcrumbForMediaGalleryItem($object);
            } else {
                if ($object instanceof MediaGallery && $object->getRootItem()) {
                    $object->getRootItem(
                    )->breadcrumb = $this->getBreadcrumbForMediaGalleryItem($object->getRootItem());
                }
            }
        }
    }
}