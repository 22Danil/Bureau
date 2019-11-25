<?php

namespace App\Repository;

use App\Entity\ReceiptOfDeregistration;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ReceiptOfDeregistration|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReceiptOfDeregistration|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReceiptOfDeregistration[]    findAll()
 * @method ReceiptOfDeregistration[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReceiptOfDeregistrationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ReceiptOfDeregistration::class);
    }

    public function AllWorks($user_id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT e.title, e.address, e.salary, r.employer_id,
                p.name as nameposition, s.name as namespecialty, r.dateadded
                FROM receipt_of_deregistration r
                INNER JOIN employers e ON r.employer_id=e.id
                INNER JOIN position p ON e.position_id=p.id
                INNER JOIN specialty s ON e.specialty_id=s.id
                WHERE r.identity_id = :user_id';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['user_id' => $user_id]);

        // возвращает массив массивов (т.е. набор чистых данных)
        return $stmt->fetchAll();
    }

    // /**
    //  * @return ReceiptOfDeregistration[] Returns an array of ReceiptOfDeregistration objects
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
    public function findOneBySomeField($value): ?ReceiptOfDeregistration
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
