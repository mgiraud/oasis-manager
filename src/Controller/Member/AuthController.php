<?php


namespace App\Controller\Member;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    /**
     * @Route("/api/logout")
     */
    public function logout(Request $request)
    {
        $response = new Response();
        $response->headers->setCookie(
            (new Cookie('BEARER', null))
                ->withSecure($this->getParameter('kernel.environment') !== 'dev')
        );

        return $response;
    }
}