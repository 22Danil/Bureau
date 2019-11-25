<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191116165815 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE employers_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE position_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE receipt_of_deregistration_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE receipt_of_registration_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE specialty_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE employers (id INT NOT NULL, title TEXT NOT NULL, address TEXT NOT NULL, number VARCHAR(255) NOT NULL, specialty_id INT NOT NULL, position_id INT NOT NULL, salary NUMERIC(10, 0) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE position (id INT NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE receipt_of_deregistration (id INT NOT NULL, identity_id INT NOT NULL, employer_id INT NOT NULL, commission NUMERIC(10, 0) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE receipt_of_registration (id INT NOT NULL, identity_id INT NOT NULL, specialty_id INT NOT NULL, position_id INT NOT NULL, estimated_salary NUMERIC(10, 0) NOT NULL, prepayment NUMERIC(10, 0) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE specialty (id INT NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE employers_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE position_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE receipt_of_deregistration_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE receipt_of_registration_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE specialty_id_seq CASCADE');
        $this->addSql('DROP TABLE employers');
        $this->addSql('DROP TABLE position');
        $this->addSql('DROP TABLE receipt_of_deregistration');
        $this->addSql('DROP TABLE receipt_of_registration');
        $this->addSql('DROP TABLE specialty');
    }
}
