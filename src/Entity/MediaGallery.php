<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MediaGalleryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"getGallery"}}
 * )
 * @ORM\Entity(repositoryClass=MediaGalleryRepository::class)
 */
class MediaGallery
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("getGallery")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups("getGallery")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("getGallery")
     */
    private $description;

    /**
     * @ORM\OneToOne(targetEntity=MediaGalleryItem::class, cascade={"persist", "remove"}, inversedBy="gallery")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("getGallery")
     */
    private $rootItem;

    public function __construct()
    {
        $rootItem = new MediaGalleryItem();
        $rootItem->setName('root');
        $this->rootItem = $rootItem;
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

    public function getRootItem(): ?MediaGalleryItem
    {
        return $this->rootItem;
    }

    public function setRootItem(MediaGalleryItem $rootItem): self
    {
        $this->rootItem = $rootItem;

        return $this;
    }
}
