<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class ContactPersister implements ContextAwareDataPersisterInterface
{
    private EntityManagerInterface $em;
    private MailerInterface $mailer;
    private RequestStack $requestStack;
    private Environment $twig;

    public function __construct(
        EntityManagerInterface $em,
        RequestStack $requestStack,
        MailerInterface $mailer,
        Environment $twig
    ) {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->requestStack = $requestStack;
        $this->twig = $twig;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Contact;
    }

    public function persist($data, array $context = [])
    {
        $request = $this->requestStack->getMasterRequest();
        /** @var Contact $contact */
        $contact = $data;
        $contact->setIp($request->getClientIp());

        $email = (new Email())
            ->from('hello@example.com')
            ->to('you@example.com')
            ->subject('Nouvelle prise de contact')
            ->html($this->twig->render('mail/contact.html.twig', [
                'contact' => $contact
            ]));

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {

        }

        $this->em->persist($data);
        $this->em->flush();
    }

    public function remove($data, array $context = [])
    {
        $this->em->remove($data);
        $this->em->flush();
    }

}