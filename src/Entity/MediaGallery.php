<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MediaGalleryRepository;
use App\Controller\Media\MediaGalleryTreeAction;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"media_gallery:read"}}
 *          },
 *         "post"={"security"="is_granted('USER_CAN_EDIT_GALLERIES')"},
 *         "tree"={
 *             "security"="is_granted('USER_CAN_EDIT_GALLERIES')",
 *             "method"="GET",
 *             "path"="/media_galleries/tree",
 *             "controller"=MediaGalleryTreeAction::class,
 *             "normalization_context"={"groups"={"media_gallery_tree:read"}}
 *         },
 *     },
 * )
 * @ORM\Entity(repositoryClass=MediaGalleryRepository::class)
 */
class MediaGallery
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("media_gallery:read")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"media_gallery:read", "media_gallery_tree:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"media_gallery:read", "media_gallery_tree:read"})
     */
    private $description;

    /**
     * @ORM\OneToOne(targetEntity=MediaGalleryItem::class, cascade={"persist", "remove"}, inversedBy="gallery")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"media_gallery:read", "media_gallery_tree:read"})
     * @ApiProperty(readableLink=true)
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
