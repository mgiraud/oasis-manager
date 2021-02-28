<?php


namespace App\Validation;


use Symfony\Component\Validator\Constraint;

class SurveyJoinCredentials extends Constraint
{
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}