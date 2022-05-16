<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\GroupFilter;
use App\Repository\BlogArticleRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\BlogArticle\GetTagsAction;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={
 *          "normalization_context"={"groups"={"blog_article:read"}},
 *          "denormalization_context"={"groups"={"blog_article:write"}},
 *     },
 *     collectionOperations={
 *         "get"={"pagination_client_items_per_page"=true},
 *         "post"={"security"="is_granted('USER_CAN_EDIT_BLOG_ARTICLES')"},
 *         "get_tags"={
 *             "method"="GET",
 *             "path"="/blog_articles/tags",
 *             "controller"=GetTagsAction::class,
 *             "openapi_context"={
 *                 "parameters"={}
 *             },
 *             "read"=false,
 *         },
 *     },
 *     itemOperations={
 *         "get"={},
 *         "put"={"security"="is_granted('USER_CAN_EDIT_BLOG_ARTICLES')"},
 *         "delete"={"security"="is_granted('USER_CAN_DELETE_BLOG_ARTICLES')"},
 *     }
 * )
 * @ORM\Entity(repositoryClass=BlogArticleRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"title": "partial", "createdBy.nickname": "exact", "isPublished": "exact"})
 * @ApiFilter(DateFilter::class, properties={"createdAt": DateFilter::EXCLUDE_NULL})
 * @ApiFilter(OrderFilter::class, properties={"createdAt"})
 * @ApiFilter(GroupFilter::class, arguments={"overrideDefaultGroups": true, "whitelist": {"blog_article:read:edition"}})
 */
class BlogArticle
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"blog_article:read", "blog_article:read:edition"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"blog_article:read", "blog_article:write", "blog_article:read:edition"})
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"blog_article:read", "blog_article:write", "blog_article:read:edition"})
     */
    private $preview;

    /**
     * @ORM\Column(type="text")
     * @Groups({"blog_article:read", "blog_article:write", "blog_article:read:edition"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetimetz")
     * @Groups({"blog_article:read", "blog_article:read:edition"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Member::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"blog_article:read", "blog_article:read:edition"})
     */
    private $createdBy;

    /**
     * @ORM\Column(type="json")
     * @Groups({"blog_article:read", "blog_article:write", "blog_article:read:edition"})
     */
    private $tags;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"blog_article:read", "blog_article:write", "blog_article:read:edition"})
     */
    private $isPublished;

    /**
     * @ORM\ManyToOne(targetEntity=MediaNode::class)
     * @Groups({"blog_article:read", "blog_article:write", "blog_article:read:edition"})
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     */
    private $mediaNode;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->isPublished = false;
        $this->tags = [];
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTags(): array
    {
        return $this->tags;
    }

    public function setTags(array $tags): self
    {
        $this->tags = $tags;

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

    public function getMediaNode(): ?MediaNode
    {
        return $this->mediaNode;
    }

    public function setMediaNode(?MediaNode $mediaNode): self
    {
        $this->mediaNode = $mediaNode;

        return $this;
    }

    public function getPreview(): ?string
    {
        return $this->preview;
    }

    public function setPreview(?string $preview): self
    {
        $this->preview = $preview;

        return $this;
    }
}
