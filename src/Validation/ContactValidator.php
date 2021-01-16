<?php


namespace App\Validation;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ContactValidator extends ConstraintValidator
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
        if (!$value instanceof \App\Entity\Contact) {
            throw new UnexpectedValueException($value, \App\Entity\Contact::class);
        }

        if (!$constraint instanceof Contact) {
            throw new UnexpectedTypeException($constraint, Contact::class);
        }

        $request = $this->requestStack->getMasterRequest();
        $lastContact = $this->entityManager->getRepository(\App\Entity\Contact::class)
            ->findOneBy(['ip' => $request->getClientIp()], ['createdAt' => 'DESC']);

        if (!$lastContact instanceof \App\Entity\Contact) {
            return;
        }

        if ((new \DateTime())->diff($lastContact->getCreatedAt())->d < 7) {
            $this->context->addViolation('Vous pouvez faire une demande de contact seulement une fois par semaine');
        }
    }

}