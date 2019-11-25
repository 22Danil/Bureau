<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SpecialtyRepository")
 */
class Specialty
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Employers", mappedBy="specialty")
     */
    private $specialtys;

    public function __construct()
    {
        $this->specialtys = new ArrayCollection();
    }

    /**
     * @return Collection|Employers[]
     */
    public function getSpecialtys()
    {
        return $this->specialtys;
    }

    /**
     * @ORM\Column(type="text")
     */
    private $name;

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }
}
