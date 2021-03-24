<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RefreshTokenRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=RefreshTokenRepository::class)
 */
class RefreshToken
{
    const REFRESH_TOKEN_PARAM_NAME = 'REFRESH';
    const REFRESH_TOKEN_TTL = 86400;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $refreshToken;

    /**
     * @ORM\Column(type="datetimetz")
     */
    private $valid;

    /**
     * @ORM\Column(type="text")
     */
    private $email;

    public function __construct(string $email, \DateTime $valid)
    {
        $this->email = $email;
        $this->valid = $valid;
        $this->setRefreshToken();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRefreshToken(): ?string
    {
        return $this->refreshToken;
    }

    public function setRefreshToken(?string $refreshToken = null): self
    {
        $this->refreshToken = null === $refreshToken
            ? bin2hex(openssl_random_pseudo_bytes(64))
            : $refreshToken;

        return $this;
    }

    public function getValid(): ?\DateTimeInterface
    {
        return $this->valid;
    }

    public function setValid(\DateTimeInterface $valid): self
    {
        $this->valid = $valid;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function __toString(): ?string
    {
        return $this->getRefreshToken();
    }

    public function isValid(): bool
    {
        return $this->valid >= new \DateTime();
    }
}
