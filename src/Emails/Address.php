<?php


namespace App\Emails;


class Address
{
    public string $identifier;
    public string $email;
    public ?string $name;

    public function __construct(string $identifier, array $emailData)
    {
        $this->identifier = $identifier;
        $this->email = $emailData['email'];
        if (array_key_exists('name', $emailData)) {
            $this->name = $emailData['name'];
        }
    }
}