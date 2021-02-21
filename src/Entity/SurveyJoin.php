<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SurveyJoinRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=SurveyJoinRepository::class)
 */
class SurveyJoin
{
    const MOTIVATIONS = [
        'Activité artistique' => 'arts',
        'Amour de la nature' => 'nature',
        'Autonomie' => 'autonomy',
        'Collapsologie' => 'collapsology',
        'Écologie' => 'ecology',
        'Rêve d’enfant' => 'child_dream',
        'Solidarité' => 'solidarity',
        'Intergénérationnel' => 'intergenerational',
        'Transmission' => 'legacy',
        'Vivre ensemble' => 'live_together',
    ];

    public function __contruct()
    {
        $this->acceptance = false;
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $firstName;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $lastName;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $city;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="boolean")
     */
    private $acceptance;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $origin;

    /**
     * @ORM\Column(type="json", nullable=true)
     * @Assert\Choice(choices=SurveyJoin::MOTIVATIONS)
     */
    private $motivations = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $motivationsFreeThinking;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $coreValuesHuman;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $coreValuesOther;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $affinity;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $questioning;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $investment;

    /**
     * @ORM\Column(type="boolean")
     */
    private $rent;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $bring;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $typicalDay;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $dwelling;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $commonAreas;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $relationship;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $cnvExperience;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $sharedGovernance;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $skills;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $limits;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $availability;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $weekAvailability;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $meet;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAcceptance(): ?bool
    {
        return $this->acceptance;
    }

    public function setAcceptance(bool $acceptance): self
    {
        $this->acceptance = $acceptance;

        return $this;
    }

    public function getOrigin(): ?string
    {
        return $this->origin;
    }

    public function setOrigin(?string $origin): self
    {
        $this->origin = $origin;

        return $this;
    }

    public function getMotivations(): ?array
    {
        return $this->motivations;
    }

    public function setMotivations(?array $motivations): self
    {
        $this->motivations = $motivations;

        return $this;
    }

    public function getMotivationsFreeThinking(): ?string
    {
        return $this->motivationsFreeThinking;
    }

    public function setMotivationsFreeThinking(?string $motivationsFreeThinking): self
    {
        $this->motivationsFreeThinking = $motivationsFreeThinking;

        return $this;
    }

    public function getCoreValuesHuman(): ?string
    {
        return $this->coreValuesHuman;
    }

    public function setCoreValuesHuman(?string $coreValuesHuman): self
    {
        $this->coreValuesHuman = $coreValuesHuman;

        return $this;
    }

    public function getCoreValuesOther(): ?string
    {
        return $this->coreValuesOther;
    }

    public function setCoreValuesOther(?string $coreValuesOther): self
    {
        $this->coreValuesOther = $coreValuesOther;

        return $this;
    }

    public function getAffinity(): ?string
    {
        return $this->affinity;
    }

    public function setAffinity(?string $affinity): self
    {
        $this->affinity = $affinity;

        return $this;
    }

    public function getQuestioning(): ?string
    {
        return $this->questioning;
    }

    public function setQuestioning(?string $questioning): self
    {
        $this->questioning = $questioning;

        return $this;
    }

    public function getInvestment(): ?string
    {
        return $this->investment;
    }

    public function setInvestment(?string $investment): self
    {
        $this->investment = $investment;

        return $this;
    }

    public function getRent(): ?bool
    {
        return $this->rent;
    }

    public function setRent(bool $rent): self
    {
        $this->rent = $rent;

        return $this;
    }

    public function getBring(): ?string
    {
        return $this->bring;
    }

    public function setBring(?string $bring): self
    {
        $this->bring = $bring;

        return $this;
    }

    public function getTypicalDay(): ?string
    {
        return $this->typicalDay;
    }

    public function setTypicalDay(?string $typicalDay): self
    {
        $this->typicalDay = $typicalDay;

        return $this;
    }

    public function getDwelling(): ?string
    {
        return $this->dwelling;
    }

    public function setDwelling(?string $dwelling): self
    {
        $this->dwelling = $dwelling;

        return $this;
    }

    public function getCommonAreas(): ?string
    {
        return $this->commonAreas;
    }

    public function setCommonAreas(?string $commonAreas): self
    {
        $this->commonAreas = $commonAreas;

        return $this;
    }

    public function getRelationship(): ?string
    {
        return $this->relationship;
    }

    public function setRelationship(?string $relationship): self
    {
        $this->relationship = $relationship;

        return $this;
    }

    public function getCnvExperience(): ?string
    {
        return $this->cnvExperience;
    }

    public function setCnvExperience(?string $cnvExperience): self
    {
        $this->cnvExperience = $cnvExperience;

        return $this;
    }

    public function getSharedGovernance(): ?string
    {
        return $this->sharedGovernance;
    }

    public function setSharedGovernance(?string $sharedGovernance): self
    {
        $this->sharedGovernance = $sharedGovernance;

        return $this;
    }

    public function getSkills(): ?string
    {
        return $this->skills;
    }

    public function setSkills(?string $skills): self
    {
        $this->skills = $skills;

        return $this;
    }

    public function getLimits(): ?string
    {
        return $this->limits;
    }

    public function setLimits(?string $limits): self
    {
        $this->limits = $limits;

        return $this;
    }

    public function getAvailability(): ?string
    {
        return $this->availability;
    }

    public function setAvailability(?string $availability): self
    {
        $this->availability = $availability;

        return $this;
    }

    public function getWeekAvailability(): ?string
    {
        return $this->weekAvailability;
    }

    public function setWeekAvailability(?string $weekAvailability): self
    {
        $this->weekAvailability = $weekAvailability;

        return $this;
    }

    public function getMeet(): ?string
    {
        return $this->meet;
    }

    public function setMeet(?string $meet): self
    {
        $this->meet = $meet;

        return $this;
    }
}
