<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MediaGalleryItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"},
 *     },
 *     attributes={"pagination_enabled"=false},
 *     normalizationContext={"groups"={"getGalleryItem"}}
 * )
 * @ORM\Entity(repositoryClass=MediaGalleryItemRepository::class)
 */
class MediaGalleryItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Default", "getGallery", "getGalleryItem"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"Default", "getGallery", "getGalleryItem"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"Default", "getGallery", "getGalleryItem"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=MediaGalleryItem::class, inversedBy="children")
     * @Ignore()
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity=MediaGalleryItem::class, mappedBy="parent")
     * @Groups({"Default", "getGallery", "getGalleryItem"})
     */
    private $children;

    /**
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="mediaGalleryItem", orphanRemoval=true)
     */
    private $mediaObjects;

    /**
     * @ORM\OneToOne(targetEntity=MediaGallery::class, mappedBy="rootItem")
     */
    private $gallery;

    /**
     * @Groups({"Default", "getGallery", "getGalleryItem"})
     */
    public array $breadcrumb = [];

    public function __construct()
    {
        $this->children = new ArrayCollection();
        $this->mediaObjects = new ArrayCollection();
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

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function addChild(self $child): self
    {
        if (!$this->children->contains($child)) {
            $this->children[] = $child;
            $child->setParent($this);
        }

        return $this;
    }

    public function removeChild(self $child): self
    {
        if ($this->children->removeElement($child)) {
            // set the owning side to null (unless already changed)
            if ($child->getParent() === $this) {
                $child->setParent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MediaObject[]
     */
    public function getMediaObjects(): Collection
    {
        return $this->mediaObjects;
    }

    public function addMediaObject(MediaObject $mediaObject): self
    {
        if (!$this->mediaObjects->contains($mediaObject)) {
            $this->mediaObjects[] = $mediaObject;
            $mediaObject->setMediaGalleryItem($this);
        }

        return $this;
    }

    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            // set the owning side to null (unless already changed)
            if ($mediaObject->getMediaGalleryItem() === $this) {
                $mediaObject->setMediaGalleryItem(null);
            }
        }

        return $this;
    }

    public function getGallery(): ?MediaGallery
    {
        return $this->gallery;
    }
}
