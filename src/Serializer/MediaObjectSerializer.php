<?php


namespace App\Serializer;


use App\Entity\MediaObject;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Serializer\Normalizer\CacheableSupportsMethodInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Vich\UploaderBundle\Storage\StorageInterface;

class MediaObjectSerializer implements ContextAwareNormalizerInterface, CacheableSupportsMethodInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private RouterInterface $router;
    private StorageInterface $storage;
    private const ALREADY_CALLED = 'MEDIA_OBJECT_NORMALIZER_ALREADY_CALLED';

    public function __construct(RouterInterface $router, StorageInterface $storage)
    {
        $this->router = $router;
        $this->storage = $storage;
    }

    /**
     * @param MediaObject $object
     */
    public function normalize($object, string $format = null, array $context = [])
    {
        $object->contentUrl = $this->router->generate('app_media_mediaobject_download', [
            'mediaId' => $object->uniqueId,
            'inline' => '1'
        ], UrlGeneratorInterface::ABSOLUTE_URL);

        $object->isImage = $this->checkFileIsImage($object);
        $context[self::ALREADY_CALLED] = true;

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, $format = null, array $context = [])
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof MediaObject;
    }

    private function checkFileIsImage(MediaObject $mediaObject): bool
    {
        $filePath = $this->storage->resolvePath($mediaObject);
        if ($filePath === null) {
            return false;
        }

        try {
            $file = new File($filePath);

            return strpos($file->getMimeType(), 'image/') !== false;
        } catch (FileNotFoundException $e) {
            return false;
        }
    }

    public function hasCacheableSupportsMethod(): bool
    {
        return false;
    }
}
