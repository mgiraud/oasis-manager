<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\ContactNewsletter;
use App\Emails\EmailFactory;
use App\Emails\Emails;
use Psr\Log\LoggerInterface;
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
    private EmailFactory $emailFactory;
    private LoggerInterface $logger;

    public function __construct(
        Environment $twig,
        MailerInterface $mailer,
        EmailFactory $emailFactory,
        LoggerInterface $logger
    ){
        $this->twig = $twig;
        $this->mailer = $mailer;
        $this->emailFactory = $emailFactory;
        $this->logger = $logger;
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

        /** @var ContactNewsletter $contactNewsletter */
        $contactNewsletter = $event->getControllerResult();

        $emailToWarnAdmin = (new Email())
            ->from($this->emailFactory->getAddress('no-reply'))
            ->to($this->emailFactory->getAddress('admin'))
            ->addTo($this->emailFactory->getAddress('contact'))
            ->subject('Nouvelle inscription à la newsletter')
            ->html($this->twig->render('mail/contact_newsletter.html.twig', [
                'contactNewsletter' => $contactNewsletter
            ]));

        try {
            $this->mailer->send($emailToWarnAdmin);
        } catch (TransportExceptionInterface $e) {
            $this->logger->critical(sprintf('Could not send email to admin for newsletter contact creation reason: %s', $e->getMessage()));
        }

        $emailToWarnUser = (new Email())
            ->from($this->emailFactory->getAddress('no-reply'))
            ->to($contactNewsletter->getEmail())
            ->subject('Confirmation d\'inscription à la newsletter')
            ->html($this->twig->render('mail/contact_newsletter_confirm.html.twig', [
                'contactNewsletter' => $contactNewsletter
            ]));

        try {
            $this->mailer->send($emailToWarnUser);
        } catch (TransportExceptionInterface $e) {
            $this->logger->critical(sprintf('Could not send email to user for newsletter contact creation reason: %s', $e->getMessage()));

        }
    }

}