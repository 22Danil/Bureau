<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EmployersRepository")
 */
class Employers
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
     * @ORM\OneToMany(targetEntity="App\Entity\ReceiptOfDeregistration", mappedBy="employer")
     * @ORM\OneToMany(targetEntity="App\Entity\ReceiptOfRegistration", mappedBy="employer")
     */
    private $receiptofderegistrations;
    private $receiptofregistrations;

    public function __construct()
    {
        $this->receiptofderegistrations = new ArrayCollection();
        $this->receiptofregistrations = new ArrayCollection();
    }

    /**
     * @return Collection|ReceiptOfDeregistration[]
     */
    public function getReceiptofderegistrations()
    {
        return $this->receiptofderegistrations;
    }
    /**
     * @return Collection|ReceiptOfRegistration[]
     */
    public function getReceiptofRegistrations()
    {
        return $this->receiptofregistrations;
    }

    /**
     * @ORM\Column(type="text")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $address;

    /**
     * @ORM\Column(type="string")
     */
    private $number;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Specialty", inversedBy="specialtys")
     */
    private $specialty;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Position", inversedBy="positions")
     */
    private $position;

    /**
     * @ORM\Column(type="decimal")
     */
    private $salary;

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
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address): void
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * @param mixed $number
     */
    public function setNumber($number): void
    {
        $this->number = $number;
    }

    /**
     * @return mixed
     */
    public function getSpecialty()
    {
        return $this->specialty;
    }

    /**
     * @param mixed $specialty
     */
    public function setSpecialty($specialty): void
    {
        $this->specialty = $specialty;
    }

    /**
     * @return mixed
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @param mixed $position
     */
    public function setPosition($position): void
    {
        $this->position = $position;
    }

    /**
     * @return mixed
     */
    public function getSalary()
    {
        return $this->salary;
    }

    /**
     * @param mixed $salary
     */
    public function setSalary($salary): void
    {
        $this->salary = $salary;
    }
}
