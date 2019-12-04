<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\IdentityRepository")
 */
class Identity
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
     * @ORM\OneToMany(targetEntity="App\Entity\ReceiptOfDeregistration", mappedBy="identity")
     * @ORM\OneToMany(targetEntity="App\Entity\ReceiptOfRegistration", mappedBy="identity")
     */
    private $idforderegistrations;
    private $idforregistrations;

    public function __construct()
    {
        $this->idforderegistrations = new ArrayCollection();
        $this->idforregistrations = new ArrayCollection();
    }

    /**
     * @return Collection|ReceiptOfDeregistration[]
     */
    public function getReceiptofderegistrations()
    {
        return $this->idforderegistrations;
    }
    /**
     * @return Collection|ReceiptOfRegistration[]
     */
    public function getReceiptofRegistrations()
    {
        return $this->idforregistrations;
    }

    /**
     * @ORM\Column(type="text")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     */
    private $lastname;

    /**
     * @ORM\Column(type="text")
     */
    private $middlename;

    /**
     * @ORM\Column(type="text")
     */
    private $login;

    /**
     * @ORM\Column(type="text")
     */
    private $password;

    /**
     * @ORM\Column(type="text")
     */
    private $role;

    /**
     * @ORM\Column(type="date")
     */
    private $dateadded;

    /**
     * @return mixed
     */
    public function getDateadded()
    {
        return $this->dateadded;
    }

    /**
     * @param mixed $dateadded
     */
    public function setDateadded($dateadded): void
    {
        $this->dateadded = $dateadded;
    }

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

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param mixed $lastname
     */
    public function setLastname($lastname): void
    {
        $this->lastname = $lastname;
    }

    /**
     * @return mixed
     */
    public function getMiddlename()
    {
        return $this->middlename;
    }

    /**
     * @param mixed $middlename
     */
    public function setMiddlename($middlename): void
    {
        $this->middlename = $middlename;
    }

    /**
     * @return mixed
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * @param mixed $login
     */
    public function setLogin($login): void
    {
        $this->login = $login;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password): void
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param mixed $role
     */
    public function setRole($role): void
    {
        $this->role = $role;
    }
}
