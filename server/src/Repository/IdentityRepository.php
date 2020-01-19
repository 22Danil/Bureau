<?php

namespace App\Repository;

use App\Entity\Identity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\DBAL\DBALException;

/**
 * @method Identity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Identity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Identity[]    findAll()
 * @method Identity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IdentityRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Identity::class);
    }

    /**
     * @param $login
     * @return Identity[]
     * @throws DBALException
     */
    public function findUser($login): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM identity p
        WHERE p.login = :login';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['login' => $login]);

        return $stmt->fetchAll();
        
    }

    public function AllIdentity($user_id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = "SELECT *
                FROM identity e
                WHERE NOT e.id = :user_id AND e.role = 'usual'";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['user_id' => $user_id]);

        return $stmt->fetchAll();
    }

    public function AdminsIdentity(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = "SELECT *
                FROM identity e
                WHERE e.role = 'admin'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    // /**
    //  * @return Identity[] Returns an array of Identity objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Identity
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
