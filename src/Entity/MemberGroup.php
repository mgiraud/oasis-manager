<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\MemberGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={
 *          "pagination_enabled"=false,
 *          "normalization_context"={"groups"={"member_category:read"}},
 *          "denormalization_context"={"groups"={"member_category:write"}},
 *     },
 * )
 * @ORM\Entity(repositoryClass=MemberGroupRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"name": "exact"})
 * @UniqueEntity("name")
 */
class MemberGroup
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text", unique=true)
     * @Groups({"member_category:read", "member_category:write"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"member_category:read", "member_category:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="json")
     * @Groups({"member_category:read", "member_category:write"})
     */
    private $permissions = [];

    /**
     * @ORM\ManyToMany(targetEntity=Member::class, mappedBy="groups")
     * @Groups({"member_category:read_members"})
     */
    private $members;

    /**
     * @Groups({"member_category:read"})
     */
    private $memberCount;

    public function __construct()
    {
        $this->members = new ArrayCollection();
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

    public function getPermissions(): ?array
    {
        return $this->permissions;
    }

    public function setPermissions(array $permissions): self
    {
        $this->permissions = $permissions;

        return $this;
    }

    /**
     * @return Collection|Member[]
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(Member $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members[] = $member;
            $member->addGroup($this);
        }

        return $this;
    }

    public function removeMember(Member $member): self
    {
        if ($this->members->removeElement($member)) {
            $member->removeGroup($this);
        }

        return $this;
    }

    public function __toString()
    {
        return $this->getName() ?? '';
    }

    public function getMemberCount(): int
    {
        return $this->members->count();
    }
}
