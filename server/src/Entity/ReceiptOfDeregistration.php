<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ReceiptOfDeregistrationRepository")
 */
class ReceiptOfDeregistration
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Identity", inversedBy="$idforderegistrations")
     * @ORM\JoinColumn(name="identity_id", referencedColumnName="id", nullable=false, onDelete="CASCADE")
     */
    private $identity;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Employers", inversedBy="receiptofderegistrations")
     */
    private $employer;


    /**
     * @ORM\Column(type="decimal")
     */
    private $commission;

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
    public function getIdentity()
    {
        return $this->identity;
    }

    /**
     * @param mixed $identity
     */
    public function setIdentity($identity): void
    {
        $this->identity = $identity;
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

    /**
     * @return mixed
     */
    public function getCommission()
    {
        return $this->commission;
    }

    /**
     * @param mixed $commission
     */
    public function setCommission($commission): void
    {
        $this->commission = $commission;
    }
}
