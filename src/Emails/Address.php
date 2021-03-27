<?php


namespace App\Emails;


class Address
{
    public string $identifier;
    public string $email;
    public ?string $name;

    public function __construct(string $identifier, array $emailData)
    {
        if (!filter_var($emailData['email'], FILTER_VALIDATE_EMAIL)) {
            throw new BadAddressException($emailData['email']);
        }
        $this->identifier = $identifier;
        $this->email = $emailData['email'];
        if (array_key_exists('name', $emailData)) {
            $this->name = $emailData['name'];
        }
    }
}