<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use App\Repository\MediaGalleryItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"},
 *     },
 *     attributes={"pagination_enabled"=false},
 *     normalizationContext={"groups"={"media_gallery_item:read", "media_gallery_tree:read"}},
 *     denormalizationContext={"groups"={"media_gallery_item:write"}},
 * )
 * @ORM\Entity(repositoryClass=MediaGalleryItemRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"name": "partial", "parent": "exact", "gallery.id": "exact"})
 * @ApiFilter(PropertyFilter::class, arguments={"whitelist": {"name"}})
 */
class MediaGalleryItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"media_gallery_item:read", "page:read", "media_gallery_tree:read", "blog_article:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"media_gallery_item:read", "media_gallery_item:write", "page:read", "media_gallery_tree:read", "blog_article:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"media_gallery_item:read", "media_gallery_item:write", "page:read", "media_gallery_tree:read", "blog_article:read"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=MediaGalleryItem::class, inversedBy="children")
     * @Groups({"media_gallery_item:write"})
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity=MediaGalleryItem::class, mappedBy="parent")
     * @Groups({"media_gallery_item:read", "media_gallery_tree:read"})
     * @ApiProperty(readableLink=true)
     */
    private $children;

    /**
     * @ORM\OneToOne(targetEntity=MediaGallery::class, mappedBy="rootItem")
     * @Groups({"media_gallery_item:write"})
     */
    private $gallery;

    /**
     * @Groups({"media_gallery_item:read"})
     */
    public array $breadcrumb = [];

    /**
     * @ORM\ManyToMany(targetEntity=MediaObject::class, mappedBy="mediaGalleryItems")
     * @Groups({"media_gallery_item:read", "page:read", "blog_article:read"})
     */
    private $mediaObjects;

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

    public function getGallery(): ?MediaGallery
    {
        return $this->gallery;
    }

    public function setGallery(MediaGallery $gallery): self
    {
        $this->gallery = $gallery;

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
            $mediaObject->addMediaGalleryItem($this);
        }

        return $this;
    }

    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            $mediaObject->removeMediaGalleryItem($this);
        }

        return $this;
    }
}
