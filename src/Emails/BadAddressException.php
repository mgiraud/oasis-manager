<?php


namespace App\Emails;


use Throwable;

class BadAddressException extends \Exception
{
    public function __construct(string $email)
    {
        parent::__construct(sprintf('L\'email %s n\'est pas valide', $email));
    }
}