<?php


namespace App\Entity;

use App\Controller\Member\GetMeAction;
use ApiPlatform\Core\Annotation\ApiResource;
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
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     },
 *     itemOperations={
 *         "get_me"={
 *             "method"="GET",
 *             "path"="/me",
 *             "controller"=GetMeAction::class,
 *             "openapi_context"={
 *                 "parameters"={}
 *             },
 *             "read"=false
 *         }
 *     }
 * )
 * @UniqueEntity("email", groups={"register"})
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
     * @Groups({"read"})
     */
    public $id;

    /**
     * @param string $name
     *
     * @ORM\Column(name="email", unique=true, type="text")
     * @Assert\NotBlank
     * @Assert\Email()
     * @Groups({"read", "register", "reset"})
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
     * @Groups({"read", "write"})
     */
    public $nickname;

    /**
     * @param array $roles
     *
     * @ORM\Column(name="roles", type="json")
     * @Groups({"read", "write"})
     */
    public $roles = [];

    /**
     * @ORM\Column(type="json")
     */
    private $permissions = [];

    /**
     * @ORM\Column(type="smallint")
     */
    private $groupPermissionsOverrideType;

    /**
     * @ORM\ManyToMany(targetEntity=MemberGroup::class, inversedBy="members")
     */
    private $groups;

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->groupPermissionsOverrideType = self::GROUP_PERMISSION_OVERRIDE_MERGE;
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
        return $this->permissions;
    }

    public function setPermissions(array $permissions): self
    {
        $this->permissions = $permissions;

        return $this;
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

}