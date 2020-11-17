<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PageLogRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=PageLogRepository::class)
 */
class PageLog
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Member::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $updatedBy;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="text")
     */
    private $originalContent;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUpdatedBy(): ?Member
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(?Member $updatedBy): self
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getOriginalContent(): ?string
    {
        return $this->originalContent;
    }

    public function setOriginalContent(string $originalContent): self
    {
        $this->originalContent = $originalContent;

        return $this;
    }
}
