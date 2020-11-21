<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PageCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;

/**
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=false,
 *     "normalization_context"={"groups"={"page_category:read"}},
 *     },
 *     collectionOperations={
 *         "get"={},
 *         "post"={"security"="is_granted(constant('App\\Security\\Permissions::USER_CAN_EDIT_PAGE_CATEGORIES'))"},
 *     },
 *     itemOperations={
 *         "get"={},
 *         "delete"={"security"="is_granted(constant('App\\Security\\Permissions::USER_CAN_DELETE_PAGE_CATEGORIES'))"},
 *         "put"={"security"="is_granted(constant('App\\Security\\Permissions::USER_CAN_EDIT_PAGE_CATEGORIES'))"},
 *     }
 * )
 * @ORM\Entity(repositoryClass=PageCategoryRepository::class)
 */
class PageCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page_category:read", "page:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="boolean", options={"default":true})
     * @Groups({"page_category:read", "page:read"})
     */
    private $showInMenu;

    /**
     * @ORM\OneToMany(targetEntity=Page::class, mappedBy="category")
     * @Groups("page_category:read")
     */
    private $pages;

    /**
     * @ORM\Column(type="text")
     * @Groups({"page_category:read", "page:read"})
     */
    private $slug;

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
}