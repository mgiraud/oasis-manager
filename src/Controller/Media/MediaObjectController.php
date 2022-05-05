<?php


namespace App\Controller\Media;


use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
        Request $request,
        EntityManagerInterface $manager,
        DownloadHandler $downloadHandler,
        string $mediaId
    ) {
        $media = $manager->getRepository(MediaObject::class)->findOneBy([
            'uniqueId' => $mediaId
        ]);
        if (!$media instanceof MediaObject) {
            throw $this->createNotFoundException();
        }

        $inline = $request->query->has('inline');

        try {
            return $downloadHandler->downloadObject($media, 'file', $objectClass = null, $fileName = null, !$inline);
        } catch (\Exception $e) {
            throw $this->createNotFoundException();
        }
    }
}
