<?php

namespace App\Repository;

use App\Entity\Position;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\DBALException;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Position|null find($id, $lockMode = null, $lockVersion = null)
 * @method Position|null findOneBy(array $criteria, array $orderBy = null)
 * @method Position[]    findAll()
 * @method Position[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PositionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Position::class);
    }

    /**
     * @return Position[]
     * @throws DBALException
     */
    public function AllPosition(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM position';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // возвращает массив массивов (т.е. набор чистых данных)
        return $stmt->fetchAll();
    }

    public function findId($value_positions): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM position p WHERE p.name = :value_positions';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['value_positions' => $value_positions]);

        // возвращает массив массивов (т.е. набор чистых данных)
        return $stmt->fetchAll();
    }

    // /**
    //  * @return Position[] Returns an array of Position objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Position
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
