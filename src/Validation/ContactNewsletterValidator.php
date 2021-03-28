<?php


namespace App\Validation;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ContactNewsletterValidator extends ConstraintValidator
{
    private EntityManagerInterface $entityManager;
    private RequestStack $requestStack;

    public function __construct(EntityManagerInterface $entityManager, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->requestStack = $requestStack;
    }

    public function validate($value, Constraint $constraint)
    {
        if (!$value instanceof \App\Entity\ContactNewsletter) {
            throw new UnexpectedValueException($value, \App\Entity\ContactNewsletter::class);
        }

        if (!$constraint instanceof ContactNewsletter) {
            throw new UnexpectedTypeException($constraint, ContactNewsletter::class);
        }

        $request = $this->requestStack->getMasterRequest();
        $lastContact = $this->entityManager->getRepository(\App\Entity\ContactNewsletter::class)
            ->findOneBy(['ip' => $request->getClientIp()], ['createdAt' => 'DESC']);

        if (!$lastContact instanceof \App\Entity\ContactNewsletter) {
            return;
        }

        if ((new \DateTime())->diff($lastContact->getCreatedAt())->d < 1) {
            $this->context->addViolation('Tu peux faire une inscription à la newsletter seulement une fois par jour');
        }
    }

}