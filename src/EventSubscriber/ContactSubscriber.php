<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Contact;
use App\Emails\EmailFactory;
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
    private EmailFactory $emailFactory;

    public function __construct(Environment $twig, MailerInterface $mailer, EmailFactory $emailFactory)
    {
        $this->twig = $twig;
        $this->mailer = $mailer;
        $this->emailFactory = $emailFactory;
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

        /** @var Contact $contact */
        $contact = $event->getControllerResult();

        $emailToWarnAdmin = (new Email())
            ->from($this->emailFactory->getAddress('no-reply'))
            ->to($this->emailFactory->getAddress('admin'))
            ->subject('Nouvelle prise de contact')
            ->html($this->twig->render('mail/contact.html.twig', [
                'contact' => $contact
            ]));

        try {
            $this->mailer->send($emailToWarnAdmin);
        } catch (TransportExceptionInterface $e) {

        }

        $emailToWarnUser = (new Email())
            ->from($this->emailFactory->getAddress('no-reply'))
            ->to($contact->getEmail())
            ->subject('Confirmation de votre prise de contact')
            ->html($this->twig->render('mail/contact_confirm.html.twig', [
                'contact' => $contact
            ]));

        try {
            $this->mailer->send($emailToWarnAdmin);
        } catch (TransportExceptionInterface $e) {

        }
    }
}