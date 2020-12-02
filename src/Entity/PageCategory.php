<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Page\PublishCategoryAction;
use App\Controller\Page\UnpublishCategoryAction;
use App\Repository\PageCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=false,
 *     "normalization_context"={"groups"={"page_category:read"}},
 *     "denormalizationContext"={"groups"={"page_category:write"}}
 *     },
 *     collectionOperations={
 *         "get"={},
 *         "post"={"security"="is_granted('USER_CAN_EDIT_PAGE_CATEGORIES')"},
 *     },
 *     itemOperations={
 *         "get"={},
 *         "delete"={"security"="is_granted('USER_CAN_DELETE_PAGE_CATEGORIES')"},
 *         "put"={"security"="is_granted('USER_CAN_EDIT_PAGE_CATEGORIES')"},
 *          "publish"={
 *             "method"="POST",
 *             "path"="/page_categories/{id}/publish",
 *             "controller"=PublishCategoryAction::class,
 *             "openapi_context"={
 *                 "summary": "Publish a page"
 *             },
 *             "security"="is_granted('USER_CAN_EDIT_PAGE_CATEGORIES')"
 *         },
 *         "unpublish"={
 *             "method"="POST",
 *             "path"="/page_categories/{id}/unpublish",
 *             "controller"=UnpublishCategoryAction::class,
 *             "openapi_context"={
 *                 "summary": "Unpublish a page"
 *             },
 *             "security"="is_granted('USER_CAN_EDIT_PAGE_CATEGORIES')"
 *         }
 *     }
 * )
 * @ORM\Entity(repositoryClass=PageCategoryRepository::class)
 */
class PageCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"page_category:read", "page:read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page_category:read", "page:read", "page_category:write"})
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\Column(type="boolean", options={"default":true})
     * @Groups({"page_category:read", "page:read", "page_category:write"})
     * @Assert\NotNull()
     */
    private $showInMenu;

    /**
     * @ORM\OneToMany(targetEntity=Page::class, mappedBy="category")
     * @Groups("page_category:read")
     */
    private $pages;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page_category:read", "page:read", "page_category:write"})
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean", options={"default": true})
     * @Groups({"page_category:read", "page:read", "page_category:write"})
     * @Assert\NotNull()
     */
    private $isPublished;

    public function __construct()
    {
        $this->showInMenu = true;
        $this->pages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        $slugger = new AsciiSlugger();
        $this->slug = $slugger->slug($this->name);

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

    /**
     * @return Collection|Page[]
     */
    public function getPages(): Collection
    {
        return $this->pages;
    }

    public function addPage(Page $page): self
    {
        if (!$this->pages->contains($page)) {
            $this->pages[] = $page;
            $page->setCategory($this);
        }

        return $this;
    }

    public function removePage(Page $page): self
    {
        if ($this->pages->removeElement($page)) {
            // set the owning side to null (unless already changed)
            if ($page->getCategory() === $this) {
                $page->setCategory(null);
            }
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

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
}
