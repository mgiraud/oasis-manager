<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validation\Contact as ContactConstraint;

/**
 * @ApiResource(
 *     attributes={
 *          "pagination_enabled"=false,
 *          "normalization_context"={"groups"={"contact:read"}},
 *          "denormalization_context"={"groups"={"contact:write"}},
 *     },
 *     collectionOperations={
 *         "get"={"security"="is_granted('USER_CAN_VIEW_CONTACT')"},
 *         "post"={}
 *     },
 *     itemOperations={
 *         "get"={"security"="is_granted('USER_CAN_VIEW_CONTACT')"},
 *         "delete"={"security"="is_granted('USER_CAN_DELETE_CONTACT')"},
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"email": "partial"})
 * @ApiFilter(DateFilter::class, properties={"createdAt": DateFilter::EXCLUDE_NULL})
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 * @ContactConstraint
 */
class Contact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(max="100", allowEmptyString=true)
     * @Groups({"contact:read", "contact:write"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(max="100", allowEmptyString=true)
     * @Groups({"contact:read", "contact:write"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Assert\Email()
     * @Groups({"contact:read", "contact:write"})
     */
    private $email;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"contact:read", "contact:write"})
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Assert\Length(min="10", max="1000")
     * @Groups({"contact:read", "contact:write"})
     */
    private $content;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Assert\Length(min="8", max="100")
     * @Groups({"contact:read", "contact:write"})
     */
    private $subject;

    /**
     * @ORM\Column(type="text")
     * @Groups({"contact:read"})
     */
    private $ip;

    /**
     * @ORM\Column(type="datetimetz")
     * @Groups({"contact:read"})
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

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

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

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

    public function getIp(): ?string
    {
        return $this->ip;
    }

    public function setIp(string $ip): self
    {
        $this->ip = $ip;

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
