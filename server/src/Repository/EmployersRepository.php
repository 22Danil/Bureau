<?php

namespace App\Repository;

use App\Entity\Employers;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Employers|null find($id, $lockMode = null, $lockVersion = null)
 * @method Employers|null findOneBy(array $criteria, array $orderBy = null)
 * @method Employers[]    findAll()
 * @method Employers[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EmployersRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Employers::class);
    }

    public function findEmployer($value_positions, $value_specialty, $EstimatedSalary): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT e.id, e.title, e.address, e.number, e.salary, p.name as position, p.id as position_id, s.name as specialty, s.id as specialty_id
                FROM Employers e
                INNER JOIN position p ON e.position_id=p.id
                INNER JOIN specialty s ON e.specialty_id=s.id
                WHERE p.id = :value_positions AND  s.id = :value_specialty AND e.salary > :EstimatedSalary
                ORDER BY e.salary DESC';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['value_positions' => $value_positions, 'value_specialty' => $value_specialty, 'EstimatedSalary' => $EstimatedSalary]);

        // возвращает массив массивов (т.е. набор чистых данных)
        return $stmt->fetchAll();
    }

    public function AllEmployer(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT e.id, e.title, e.address, e.number, e.salary, e.dateadded, p.name as position, p.id as position_id, s.name as specialty, s.id as specialty_id
                FROM Employers e
                INNER JOIN position p ON e.position_id=p.id
                INNER JOIN specialty s ON e.specialty_id=s.id';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // возвращает массив массивов (т.е. набор чистых данных)
        return $stmt->fetchAll();
    }

    // /**
    //  * @return Employers[] Returns an array of Employers objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Employers
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
