<?php
namespace App\Controller\Media;

use App\Entity\MediaGalleryItem;
use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class CreateMediaObjectAction
{
    public function __invoke(Request $request, EntityManagerInterface $manager): MediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $galleryItemId = $request->request->get('mediaGalleryItemId');
        if (!$galleryItemId) {
            throw new BadRequestHttpException('"mediaGalleryItemId" is required');
        }

        $galleryItem = $manager->getRepository(MediaGalleryItem::class)->find($galleryItemId);
        if (!$galleryItem instanceof MediaGalleryItem) {
            throw new BadRequestHttpException(sprintf('"mediaGalleryItem" not found for id %d', $galleryItemId));
        }

        $mediaObject = new MediaObject();
        $mediaObject->file = $uploadedFile;
        $mediaObject->setMediaGalleryItem($galleryItem);

        return $mediaObject;
    }
}