<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use App\Controller\Media\MediaNodeTreeAction;
use App\Repository\MediaNodeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"},
 *          "tree"={
 *             "security"="is_granted('USER_CAN_EDIT_GALLERIES')",
 *             "method"="GET",
 *             "path"="/media_nodes/tree",
 *             "controller"=MediaNodeTreeAction::class,
 *             "normalization_context"={"groups"={"media_node_tree:read"}}
 *         },
 *     },
 *     attributes={"pagination_enabled"=false},
 *     normalizationContext={"groups"={"media_node:read", "media_node_tree:read"}},
 *     denormalizationContext={"groups"={"media_node:write"}},
 * )
 * @ORM\Entity(repositoryClass=MediaNodeRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"name": "partial", "parent": "exact"})
 * @ApiFilter(PropertyFilter::class, arguments={"whitelist": {"name"}})
 * @ApiFilter(ExistsFilter::class, properties={"parent"})
 */
class MediaNode
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"media_node:read", "page:read", "media_node_tree:read", "blog_article:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"media_node:read", "media_node:write", "page:read", "media_node_tree:read", "blog_article:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"media_node:read", "media_node:write", "page:read", "media_node_tree:read", "blog_article:read"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=MediaNode::class, inversedBy="children")
     * @Groups({"media_node:write"})
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity=MediaNode::class, mappedBy="parent")
     * @Groups({"media_node:read", "media_node_tree:read"})
     * @ApiProperty(readableLink=true)
     */
    private $children;

    /**
     * @Groups({"media_node:read"})
     */
    public array $breadcrumb = [];

    /**
     * @ORM\ManyToMany(targetEntity=MediaObject::class, mappedBy="mediaNodes")
     * @Groups({"media_node:read", "page:read", "blog_article:read"})
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
            $mediaObject->addMediaNode($this);
        }

        return $this;
    }

    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            $mediaObject->removeMediaNode($this);
        }

        return $this;
    }
}
