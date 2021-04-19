<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Page\PublishAction;
use App\Controller\Page\UnpublishAction;
use App\Repository\PageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;

/**
 * @ApiResource(
 *     attributes={
 *          "normalization_context"={"groups"={"page:read"}},
 *          "denormalization_context"={"groups"={"page:write"}},
 *     },
 *     collectionOperations={
 *         "get"={},
 *         "post"={"security"="is_granted('USER_CAN_EDIT_PAGES')"},
 *     },
 *     itemOperations={
 *         "get"={"method"="GET"},
 *         "delete"={"security"="is_granted('USER_CAN_DELETE_PAGES')"},
 *         "put"={"security"="is_granted('USER_CAN_EDIT_PAGES')"},
 *         "publish"={
 *             "method"="POST",
 *             "path"="/pages/{id}/publish",
 *             "controller"=PublishAction::class,
 *             "openapi_context"={
 *                  "summary": "Publish a page"
 *              },
 *              "security"="is_granted('USER_CAN_EDIT_PAGES')"
 *         },
 *         "unpublish"={
 *             "method"="POST",
 *             "path"="/pages/{id}/unpublish",
 *             "controller"=UnpublishAction::class,
 *             "openapi_context"={
 *                 "summary": "Unpublish a page"
 *             },
 *             "security"="is_granted('USER_CAN_EDIT_PAGES')"
 *         }
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"url": "partial", "title": "partial", "createdBy.nickname": "exact", "showInMenu": "exact", "isPublished": "exact", "category": "exact"})
 * @ApiFilter(DateFilter::class, properties={"createdAt": DateFilter::EXCLUDE_NULL})
 * @ORM\Entity(repositoryClass=PageRepository::class)
 * @UniqueEntity(fields={"url"})
 */
class Page
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @ApiProperty(identifier=false)
     */
    private $id;

    /**
     * @ORM\Column(type="text", unique=true)
     * @ApiProperty(identifier=true)
     * @Groups({"page:read", "page_category:read", "page:write"})
     */
    private $url;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page:read", "page_category:read", "page:write"})
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page:read", "page:write"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"page:read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Member::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"page:read"})
     */
    private $createdBy;

    /**
     * @ORM\ManyToMany(targetEntity=MemberGroup::class)
     */
    private $protectionGroups;

    /**
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"page:read", "page_category:read", "page:write"})
     */
    private $isPublished;

    /**
     * @ORM\ManyToOne(targetEntity=PageCategory::class, inversedBy="pages")
     * @Groups({"page:read", "page:write"})
     */
    private $category;

    /**
     * @ORM\Column(type="boolean", options={"default":true})
     * @Groups({"page:read", "page_category:read", "page:write"})
     */
    private $showInMenu;

    public function __construct()
    {
        $this->showInMenu = true;
        $this->protectionGroups = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->isPublished = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $slugger = new AsciiSlugger();
        $this->url = $slugger->slug($url);

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreatedBy(): ?Member
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?Member $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * @return Collection|MemberGroup[]
     */
    public function getProtectionGroups(): Collection
    {
        return $this->protectionGroups;
    }

    public function addProtectionGroup(MemberGroup $protectionGroup): self
    {
        if (!$this->protectionGroups->contains($protectionGroup)) {
            $this->protectionGroups[] = $protectionGroup;
        }

        return $this;
    }

    public function removeProtectionGroup(MemberGroup $protectionGroup): self
    {
        $this->protectionGroups->removeElement($protectionGroup);

        return $this;
    }

    public function getIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    public function getCategory(): ?PageCategory
    {
        return $this->category;
    }

    public function setCategory(?PageCategory $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getShowInMenu(): ?bool
    {
        return $this->showInMenu;
    }

    public function setShowInMenu(bool $showInMenu): self
    {
        $this->showInMenu = $showInMenu;

        return $this;
    }
}
