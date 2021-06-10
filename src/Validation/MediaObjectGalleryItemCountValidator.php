<?php


namespace App\Validation;


use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class MediaObjectGalleryItemCountValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$value instanceof Collection) {
            throw new UnexpectedValueException($value, Collection::class);
        }

        if (!$constraint instanceof MediaObjectGalleryItemCount) {
            throw new UnexpectedTypeException($constraint, MediaObjectGalleryItemCount::class);
        }

        if ($value->count() === 0) {
            $this->context->addViolation('Un fichier doit appartenir à au moins un dossier');
        }
    }

}