<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PageLogRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={
 *          "normalization_context"={"groups"={"page_log:read"}},
 *          "denormalization_context"={"groups"={"page_log:write"}},
 *     },
 *     collectionOperations={
 *         "get"={"method"="GET"},
 *         "post"={"security"="is_granted('USER_CAN_EDIT_PAGE')"},
 *     },
 *     itemOperations={
 *         "get"={"method"="GET"},
 *     }
 * )
 * @ORM\Entity(repositoryClass=PageLogRepository::class)
 */
class PageLog
{
    const LOGS_PER_PAGE = 3;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"page_log:read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Member::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"page_log:read"})
     */
    private $updatedBy;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"page_log:read"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page_log:read", "page_log:write"})
     */
    private $originalContent;

    /**
     * @ORM\Column(type="boolean", nullable=false, options={"default"=false})
     * @Groups({"page_log:read", "page_log:write"})
     */
    private $draft;

    /**
     * @ORM\ManyToOne(targetEntity=Page::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $page;

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

    public function isDraft(): bool
    {
        return $this->draft;
    }

    public function setIsDraft(bool $draft): self
    {
        $this->draft = $draft;

        return $this;
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page): self
    {
        $this->page = $page;

        return $this;
    }
}
