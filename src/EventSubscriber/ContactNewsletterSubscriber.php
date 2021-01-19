<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\ContactNewsletter;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class ContactNewsletterSubscriber implements EventSubscriberInterface
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
                ['onContactNewsletterValidated', EventPriorities::POST_VALIDATE],
                ['onContactNewsletterWritten', EventPriorities::POST_WRITE],
            ],
        ];
    }

    public function onContactNewsletterValidated(ViewEvent $event)
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return;
        }

        if (!$event->getControllerResult() instanceof ContactNewsletter) {
            return;
        }

        /** @var ContactNewsletter $contactNewsletter */
        $contactNewsletter = $event->getControllerResult();
        $contactNewsletter->setIp($event->getRequest()->getClientIp());
    }

    public function onContactNewsletterWritten(ViewEvent $event)
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return;
        }

        if (!$event->getControllerResult() instanceof ContactNewsletter) {
            return;
        }

        $email = (new Email())
            ->from('hello@example.com')
            ->to('you@example.com')
            ->subject('Nouvelle prise de contact')
            ->html($this->twig->render('mail/contact_newsletter.html.twig', [
                'contactNewsletter' => $event->getControllerResult()
            ]));

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {

        }
    }

}