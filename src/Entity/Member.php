<?php


namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Member\CloseAction;
use App\Controller\Member\GetMeAction;
use App\Security\Permissions;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(uniqueConstraints={@ORM\UniqueConstraint(columns={"email"})})
 * @ApiResource(
 *     attributes={
 *     "normalization_context"={"groups"={"member:read"}},
 *     "denormalization_context"={"groups"={"member:write"}},
 *     },
 *     itemOperations={
 *         "get"={"security"="is_granted('USER_CAN_ACCESS_MEMBERS')"},
 *         "get_me"={
 *             "method"="GET",
 *             "path"="/me",
 *             "controller"=GetMeAction::class,
 *             "openapi_context"={
 *                 "parameters"={}
 *             },
 *             "read"=false,
 *             "security"="is_granted('USER_CAN_ACCESS_MEMBERS') or user === object"
 *         },
 *         "close"={
 *              "method"="PATCH",
 *              "controller"=CloseAction::class,
 *              "path"="/members/{id}/close",
 *              "security"="is_granted('USER_CAN_EDIT_MEMBERS')"
 *         },
 *         "put"={"security"="is_granted('USER_CAN_EDIT_MEMBERS') and is_granted('MEMBER_EDIT', object)"}
 *     },
 *     collectionOperations={
 *         "get"={"security"="is_granted('USER_CAN_ACCESS_MEMBERS')"},
 *         "post"={"security"="is_granted('USER_CAN_EDIT_MEMBERS') and is_granted('MEMBER_EDIT', object)"},
 *     },
 * )
 * @UniqueEntity("email", groups={"register"})
 * @ApiFilter(SearchFilter::class, properties={"email": "partial", "nickname": "partial", "groups.name": "ipartial"})
 * @UniqueEntity("nickname")
 */
class Member implements UserInterface
{
    const STATUS_CLOSED = 'C';
    const STATUS_OPEN = 'O';
    const STATUS_PENDING = 'P';

    const GROUP_PERMISSION_OVERRIDE_MERGE = 0;
    const GROUP_PERMISSION_OVERRIDE_GROUPS_ONLY = 1;
    const GROUP_PERMISSION_OVERRIDE_MEMBER_ONLY = 2;

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"member:read"})
     */
    public $id;

    /**
     * @param string $name
     *
     * @ORM\Column(name="email", unique=true, type="text")
     * @Assert\NotBlank
     * @Assert\Email()
     * @Groups({"member:read", "member:reset"})
     *
     */
    public $email;

    /**
     * @param string $name
     *
     * @ORM\Column(name="password", unique=true, type="text")
     */
    public $password;

    /**
     * @param string $nickname
     *
     * @ORM\Column(name="nickname", type="text", unique=true)
     * @Assert\Length(min="3")
     * @Groups({"member:read", "member:write"})
     */
    public $nickname;

    /**
     * @param array $roles
     *
     * @ORM\Column(name="roles", type="json")
     */
    public $roles = [];

    /**
     * @ORM\Column(type="json")
     * @Groups({"member:read", "member:write"})
     */
    private $permissions = [];

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"member:read", "member:write"})
     */
    private $groupPermissionsOverrideType;

    /**
     * @ORM\ManyToMany(targetEntity=MemberGroup::class, inversedBy="members")
     * @Groups({"member:read", "member:write"})
     */
    private $groups;

    /**
     * @ORM\Column(type="text")
     */
    private $status;

    /**
     * @Groups({"member:read"})
     */
    private $isAdmin = [];

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->groupPermissionsOverrideType = self::GROUP_PERMISSION_OVERRIDE_MERGE;
        $this->status = self::STATUS_PENDING;
    }

    public function getRoles()
    {
        return $this->roles;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getSalt()
    {
        return null;
    }

    public function getUsername()
    {
        return $this->email;
    }

    public function eraseCredentials()
    {

    }

    public function getPermissions(): ?array
    {
        if (in_array('ROLE_ADMIN', $this->getRoles())) {
            return Permissions::getPermissions();
        }
        if ($this->getGroups()->count() === 0) {
            return $this->permissions;
        }
        $groupPermissions = [];
        /** @var MemberGroup $group */
        foreach ($this->getGroups() as $group) {
            $groupPermissions = array_merge($groupPermissions, $group->getPermissions());
        }
        if ($this->getGroupPermissionsOverrideType() === Member::GROUP_PERMISSION_OVERRIDE_MERGE) {
           return array_unique(array_merge($this->permissions, $groupPermissions));
        } else if ($this->getGroupPermissionsOverrideType() === Member::GROUP_PERMISSION_OVERRIDE_GROUPS_ONLY) {
            return array_unique($groupPermissions);
        }
        return $this->permissions;
    }

    public function setPermissions(array $permissions): self
    {
        $this->permissions = $permissions;

        return $this;
    }

    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->getPermissions());
    }

    public function getGroupPermissionsOverrideType(): ?int
    {
        return $this->groupPermissionsOverrideType;
    }

    public function setGroupPermissionsOverrideType(int $groupPermissionsOverrideType): self
    {
        $this->groupPermissionsOverrideType = $groupPermissionsOverrideType;

        return $this;
    }

    /**
     * @return Collection|MemberGroup[]
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function addGroup(MemberGroup $group): self
    {
        if (!$this->groups->contains($group)) {
            $this->groups[] = $group;
        }

        return $this;
    }

    public function removeGroup(MemberGroup $group): self
    {
        $this->groups->removeElement($group);

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getIsAdmin(): bool
    {
        return in_array('ROLE_ADMIN', $this->getRoles());
    }

}