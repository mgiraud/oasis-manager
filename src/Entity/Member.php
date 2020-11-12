<?php


namespace App\Entity;

use App\Controller\Member\GetMeAction;
use ApiPlatform\Core\Annotation\ApiResource;
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
 */
class Member implements UserInterface
{
    const STATUS_CLOSED = 'C';
    const STATUS_OPEN = 'O';
    const STATUS_PENDING = 'P';

    /**
     * @ORM\Column(type="integer", name="id_member")
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
     * @ORM\Column(name="nickname", type="text")
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

}