<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MediaGalleryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=MediaGalleryRepository::class)
 */
class MediaGallery
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=MediaGalleryItem::class, mappedBy="mediaGallery")
     */
    private $mediaGalleryItems;

    public function __construct()
    {
        $this->mediaGalleryItems = new ArrayCollection();
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

    /**
     * @return Collection|MediaGalleryItem[]
     */
    public function getMediaGalleryItems(): Collection
    {
        return $this->mediaGalleryItems;
    }

    public function addMediaGalleryItem(MediaGalleryItem $mediaGalleryItem): self
    {
        if (!$this->mediaGalleryItems->contains($mediaGalleryItem)) {
            $this->mediaGalleryItems[] = $mediaGalleryItem;
            $mediaGalleryItem->setMediaGallery($this);
        }

        return $this;
    }

    public function removeMediaGalleryItem(MediaGalleryItem $mediaGalleryItem): self
    {
        if ($this->mediaGalleryItems->removeElement($mediaGalleryItem)) {
            // set the owning side to null (unless already changed)
            if ($mediaGalleryItem->getMediaGallery() === $this) {
                $mediaGalleryItem->setMediaGallery(null);
            }
        }

        return $this;
    }
}
