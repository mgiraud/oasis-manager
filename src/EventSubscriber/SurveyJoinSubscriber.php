<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Emails\EmailFactory;
use App\Entity\SurveyJoin;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class SurveyJoinSubscriber implements EventSubscriberInterface
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
                ['onSurveyJoinWritten', EventPriorities::POST_WRITE],
            ],
        ];
    }

    public function onSurveyJoinWritten(ViewEvent $event)
    {
        if ('POST' !== $event->getRequest()->getMethod()) {
            return;
        }

        if (!$event->getControllerResult() instanceof SurveyJoin) {
            return;
        }

        /** @var SurveyJoin $surveyJoin */
        $surveyJoin = $event->getControllerResult();

        $emailToWarnAdmin = (new Email())
            ->from($this->emailFactory->getAddress('no-reply'))
            ->to($this->emailFactory->getAddress('admin'))
            ->addTo($this->emailFactory->getAddress('contact'))
            ->subject('Nouveau remplissage du questionnaire pour rejoindre le groupe')
            ->html($this->twig->render('mail/survey_join.html.twig', [
                'surveyJoin' => $surveyJoin,
                'motivations' => array_flip(SurveyJoin::MOTIVATIONS)
            ]));

        try {
            $this->mailer->send($emailToWarnAdmin);
        } catch (TransportExceptionInterface $e) {
            $this->logger->critical(sprintf('Could not send email to admin for newsletter contact creation reason: %s', $e->getMessage()));
        }

        $emailToWarnUser = (new Email())
            ->from($this->emailFactory->getAddress('no-reply'))
            ->to($surveyJoin->getEmail())
            ->subject('Confirmation d\'envoi du questionnaire')
            ->html($this->twig->render('mail/survey_join_confirm.html.twig'));

        try {
            $this->mailer->send($emailToWarnUser);
        } catch (TransportExceptionInterface $e) {
            $this->logger->critical(sprintf('Could not send email to user for newsletter contact creation reason: %s', $e->getMessage()));
        }
    }
}