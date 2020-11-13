<?php


namespace App\Controller\Media;


use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Handler\DownloadHandler;

/**
 * @Route(path="/media_objects")
 */
class MediaObjectController extends AbstractController
{
    /**
     * @Route(path="/{mediaId}/download", methods={"GET"})
     */
    public function download(
        EntityManagerInterface $manager,
        DownloadHandler $downloadHandler,
        int $mediaId
    ) {
        $media = $manager->getRepository(MediaObject::class)->find($mediaId);

        if (!$media instanceof MediaObject) {
            return $this->createNotFoundException();
        }

        return $downloadHandler->downloadObject($media, 'file');
    }
}