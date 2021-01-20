<?php


namespace App\Validation;


use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ContactNewsletter extends Constraint
{
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}