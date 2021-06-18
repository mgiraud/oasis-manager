<?php
namespace App\Controller\Media;

use App\Entity\MediaNode;
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

        $mediaNodeId = $request->request->get('mediaNodeId');
        if (!$mediaNodeId) {
            throw new BadRequestHttpException('"mediaNodeId" is required');
        }

        $mediaNode = $manager->getRepository(MediaNode::class)->find($mediaNodeId);
        if (!$mediaNode instanceof MediaNode) {
            throw new BadRequestHttpException(sprintf('"mediaNode" not found for id %d', $mediaNodeId));
        }

        $mediaObject = new MediaObject();
        $mediaObject->file = $uploadedFile;
        $mediaObject->addMediaNode($mediaNode);

        return $mediaObject;
    }
}
