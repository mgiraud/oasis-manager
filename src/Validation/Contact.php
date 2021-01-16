<?php


namespace App\Validation;


use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class Contact extends Constraint
{
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}