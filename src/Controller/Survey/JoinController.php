<?php


namespace App\Controller\Survey;

use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use Knp\Snappy\Pdf;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JoinController extends AbstractController
{
    /**
     * @Route(path="/survey/join.pdf", methods={"GET"})
     */
    public function joinSurveyPdf(Pdf $knpSnappyPdf)
    {
        $html = $this->renderView('survey/join.html.twig');
        return new Response($html);
        return new PdfResponse(
            $knpSnappyPdf->getOutputFromHtml($html),
            'file.pdf'
        );
    }
}