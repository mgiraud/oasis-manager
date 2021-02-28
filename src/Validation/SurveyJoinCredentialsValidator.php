<?php


namespace App\Validation;


use App\Entity\SurveyJoin;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class SurveyJoinCredentialsValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$value instanceof SurveyJoin) {
            throw new UnexpectedValueException($value, SurveyJoin::class);
        }

        if (!$constraint instanceof SurveyJoinCredentials) {
            throw new UnexpectedTypeException($constraint, SurveyJoinCredentials::class);
        }

        if (empty($value->getEmail()) && empty($value->getPhoneNumber())) {
            $this->context->addViolation('Vous devez préciser au moins un email ou un numéro de téléphone pour que nous puissions vous recontacter');
        }
    }
}