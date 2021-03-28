<?php


namespace App\Emails;


use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Mime\Address as MimeAddress;

class EmailFactory
{
    public ArrayCollection $emails;

    public function __construct(array $emailConfigs) {
        $this->emails = new ArrayCollection();
        foreach ($emailConfigs as $identifier => $emailConfig) {
            $this->emails->set($identifier, new Address($identifier, $emailConfig));
        }
    }

    public function getAddress(string $identifier): ?MimeAddress
    {
        /** @var ?Address $address */
        $address = $this->emails->get($identifier);
        if (null === $address) {
            throw new AddressNotFoundException($identifier);
        }
        return new MimeAddress($address->email, $address->name ?? '');
    }
}