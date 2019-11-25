<?php

namespace App\Repository;

use App\Entity\ReceiptOfRegistration;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ReceiptOfRegistration|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReceiptOfRegistration|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReceiptOfRegistration[]    findAll()
 * @method ReceiptOfRegistration[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReceiptOfRegistrationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ReceiptOfRegistration::class);
    }

    public function AllReceipt($user_id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT r.id, r.estimated_salary, r.prepayment, r.employer_id, r.position_id, r.specialty_id, p.name as nameposition, s.name as namespecialty, r.dateadded
                FROM receipt_of_registration r
                INNER JOIN position p ON r.position_id=p.id
                INNER JOIN specialty s ON r.specialty_id=s.id
                WHERE r.identity_id = :user_id AND r.paid = false ';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['user_id' => $user_id]);

        // возвращает массив массивов (т.е. набор чистых данных)
        return $stmt->fetchAll();
    }

    // /**
    //  * @return ReceiptOfRegistration[] Returns an array of ReceiptOfRegistration objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ReceiptOfRegistration
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
