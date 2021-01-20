<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Contact;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class ContactSubscriber implements EventSubscriberInterface
{
    private Environment $twig;
    private MailerInterface $mailer;

    public function __construct(Environment $twig, MailerInterface $mailer)
    {
        $this->twig = $twig;
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['onContactValidated', EventPriorities::POST_VALIDATE],
                ['onContactWritten', EventPriorities::POST_WRITE],
            ],
        ];
    }

    public function onContactValidated(ViewEvent $event)
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return;
        }

        if (!$event->getControllerResult() instanceof Contact) {
            return;
        }

        /** @var Contact $contact */
        $contact = $event->getControllerResult();
        $contact->setIp($event->getRequest()->getClientIp());
    }

    public function onContactWritten(ViewEvent $event)
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return;
        }

        if (!$event->getControllerResult() instanceof Contact) {
            return;
        }

        $email = (new Email())
            ->from('hello@example.com')
            ->to('you@example.com')
            ->subject('Nouvelle prise de contact')
            ->html($this->twig->render('mail/contact.html.twig', [
                'contact' => $event->getControllerResult()
            ]));

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {

        }
    }
}