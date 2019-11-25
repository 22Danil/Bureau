<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ReceiptOfRegistrationRepository")
 */
class ReceiptOfRegistration
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Identity", inversedBy="idforregistrations")
     * @ORM\JoinColumn(name="identity_id", referencedColumnName="id", nullable=false, onDelete="CASCADE")
     */
    private $identity;

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
    private $estimated_salary;

    /**
     * @ORM\Column(type="decimal")
     */
    private $prepayment;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Employers", inversedBy="receiptofregistrations")
     */
    private $employer;

    /**
     * @ORM\Column(type="date")
     */
    private $dateadded;

    /**
     * @ORM\Column(type="boolean")
     */
    private $paid;

    /**
     * @return mixed
     */
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * @param mixed $paid
     */
    public function setPaid($paid): void
    {
        $this->paid = $paid;
    }

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
    public function getIdentity()
    {
        return $this->identity;
    }

    /**
     * @param mixed $identity
     */
    public function setIdentityId($identity): void
    {
        $this->identity = $identity;
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
    public function getEstimatedSalary()
    {
        return $this->estimated_salary;
    }

    /**
     * @param mixed $estimated_salary
     */
    public function setEstimatedSalary($estimated_salary): void
    {
        $this->estimated_salary = $estimated_salary;
    }

    /**
     * @return mixed
     */
    public function getPrepayment()
    {
        return $this->prepayment;
    }

    /**
     * @param mixed $prepayment
     */
    public function setPrepayment($prepayment): void
    {
        $this->prepayment = $prepayment;
    }

    /**
     * @return mixed
     */
    public function getEmployer()
    {
        return $this->employer;
    }

    /**
     * @param mixed $employer
     */
    public function setEmployer($employer): void
    {
        $this->employer = $employer;
    }
}
