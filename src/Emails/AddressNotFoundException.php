<?php


namespace App\Emails;


class AddressNotFoundException extends \Exception
{
    public function __construct(string $identifier)
    {
        $message = sprintf('Address with identifier "%s" was not configured', $identifier);
        parent::__construct($message);
    }
}