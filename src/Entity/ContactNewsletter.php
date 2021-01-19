<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContactNewsletterRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *          "pagination_enabled"=false,
 *          "normalization_context"={"groups"={"contact_newsletter:read"}},
 *          "denormalization_context"={"groups"={"contact_newsletter:write"}},
 *     },
 *     collectionOperations={
 *         "get"={"security"="is_granted('USER_CAN_VIEW_CONTACT_NEWSLETTER')"},
 *         "post"={}
 *     },
 *     itemOperations={
 *         "get"={"security"="is_granted('USER_CAN_VIEW_CONTACT_NEWSLETTER')"},
 *         "delete"={"security"="is_granted('USER_CAN_DELETE_CONTACT_NEWSLETTER')"},
 *     }
 * )
 * @ORM\Table(uniqueConstraints={@ORM\UniqueConstraint(columns={"email"})})
 * @ORM\Entity(repositoryClass=ContactNewsletterRepository::class)
 * @UniqueEntity(fields={"email"})
 */
class ContactNewsletter
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Groups({"contact_newsletter:read", "contact_newsletter:write"})
     */
    private $email;

    /**
     * @ORM\Column(type="datetimetz")
     * @Groups({"contact_newsletter:read"})
     */
    private $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
