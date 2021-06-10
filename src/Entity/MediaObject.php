<?php
// api/src/Entity/MediaObject.php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Media\CreateMediaObjectAction;
use App\Validation\MediaObjectGalleryItemCount;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={
 *         "groups"={"media_object:read"}
 *     },
 *     denormalizationContext={"groups"={"media_object:write"}},
 *     collectionOperations={
 *         "post"={
 *             "security"="is_granted('USER_CAN_UPLOAD_MEDIA_OBJECTS')",
 *             "controller"=CreateMediaObjectAction::class,
 *             "deserialize"=false,
 *             "validation_groups"={"Default", "media_object_create"},
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "file"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     },
 *                                      "mediaGalleryItemId"={
 *                                          "type"="integer",
 *                                      }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         },
 *         "get"
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('USER_CAN_EDIT_MEDIA_OBJECTS')"}
 *     }
 * )
 * @Vich\Uploadable
 * @ApiFilter(SearchFilter::class, properties={"mediaGalleryItems": "exact"})
 * @ORM\HasLifecycleCallbacks()
 */
class MediaObject
{
    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     * @ApiProperty(identifier=false)
     */
    protected $id;

    /**
     * @var string|null
     *
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @Groups({"media_object:read", "page:read"})
     */
    public $contentUrl;

    /**
     * @var File|null
     *
     * @Assert\NotNull(groups={"media_object_create"})
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="filePath")
     */
    public $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true, type="text")
     * @Groups({"media_object:read", "page:read", "blog_article:read"})
     */
    public $filePath;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=false, type="text", unique=true)
     * @Groups({"media_object:read"})
     * @ApiProperty(identifier=true)
     */
    public $uniqueId;

    /**
     * @ApiProperty()
     * @Groups({"media_object:read", "page:read", "blog_article:read"})
     */
    public $isImage = false;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true, type="text")
     * @Groups({"media_object:read", "media_object:write", "page:read", "media_object:write", "blog_article:read"})
     */
    public $customName;

    /**
     * @ORM\ManyToMany(targetEntity=MediaGalleryItem::class, inversedBy="mediaObjects")
     * @ApiProperty(readableLink=false, writableLink=false)
     * @Groups({"media_object:write", "media_object:read", "media_gallery_tree:read"})
     * @MediaObjectGalleryItemCount()
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

    /** @ORM\PrePersist() */
    public function generateUniqueId()
    {
        $this->uniqueId = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 24);
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
        }

        return $this;
    }

    public function removeMediaGalleryItem(MediaGalleryItem $mediaGalleryItem): self
    {
        $this->mediaGalleryItems->removeElement($mediaGalleryItem);

        return $this;
    }
}
