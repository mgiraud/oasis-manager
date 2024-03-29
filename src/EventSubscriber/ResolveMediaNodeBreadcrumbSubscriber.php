<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\MediaNode;
use App\Entity\MediaObject;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ResolveMediaNodeBreadcrumbSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    private function getBreadcrumbForMediaNode(MediaNode $item): array
    {
        $breadcrumb = [];
        while ($item->getParent()) {
            array_unshift($breadcrumb, [
                'id' => $item->getId(),
                '@id' => '/api/media_nodes/' . $item->getId(),
                'name' => $item->getName(),
                'type' => 'item'
            ]);
            $item = $item->getParent();
        }
        array_unshift($breadcrumb, [
            'id' => $item->getId(),
            '@id' => '/api/media_nodes/' . $item->getId(),
            'name' => $item->getName(),
            'type' => 'item'
        ]);
        return $breadcrumb;
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if ($controllerResult instanceof Response
            || $request->attributes->get('_api_item_operation_name') !== 'get'
        ) {
            return;
        }
        if (!($attributes = RequestAttributesExtractor::extractAttributes($request
            )) || !\is_a($attributes['resource_class'], MediaNode::class, true)) {
            return;
        }

        $objects = $controllerResult;

        if (!is_iterable($objects)) {
            $objects = [$objects];
        }

        foreach ($objects as $object) {
            if ($object instanceof MediaNode) {
                $object->breadcrumb = $this->getBreadcrumbForMediaNode($object);
            }
        }
    }
}
