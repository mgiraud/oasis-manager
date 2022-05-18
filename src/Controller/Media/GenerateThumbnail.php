<?php

namespace App\Controller\Media;

use App\Entity\MediaNode;
use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Storage\StorageInterface;

class GenerateThumbnail
{
    public function __invoke(StorageInterface $storage, EntityManagerInterface $em, MediaObject $data): MediaObject
    {
        try {
            $filePath = $storage->resolvePath($data);
            $file = new File($filePath);
            if (strpos($file->getMimeType(), 'image/') === false) {
                return $data;
            }
            foreach (MediaObject::IMG_SIZE as $name => $size) {
                $thumbnailPath = str_replace($file->getBasename(),
                    $file->getBasename() . '_thubmnail_' . $name,
                    $filePath
                );
                if (file_exists($thumbnailPath)) {
                    continue;
                }
                $sizes = getimagesize($filePath);
                if ($sizes[0] < $size && $sizes[1] < $size) {
                    continue;
                }
                $imagick = new \Imagick(realpath($filePath));
                $imagick->thumbnailImage($size, $size, true, false);
                $imagick->writeImage($thumbnailPath);

                $mediaThumbnail = new MediaObject();
                $mediaThumbnail->filePath = $file->getBasename() . '_thubmnail_' . $name;
                $mediaThumbnail->customName = ($data->customName ?? $data->uniqueId) . '_thumb_' . $name;
                $mediaThumbnail->original = $data;
                $mediaThumbnail->size = $name;
                $em->persist($mediaThumbnail);

                foreach ($data->getMediaNodes() as $mediaNode) {
                    $mediaNode->addMediaObject($mediaThumbnail);
                }
            }

            $em->flush();
        } catch (\Exception $e) {}
        return $data;
    }
}
