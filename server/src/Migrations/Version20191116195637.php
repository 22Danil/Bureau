<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191116195637 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE receipt_of_deregistration ALTER employer_id DROP NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_deregistration ADD CONSTRAINT FK_1D447DE241CD9E7A FOREIGN KEY (employer_id) REFERENCES employers (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1D447DE241CD9E7A ON receipt_of_deregistration (employer_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE receipt_of_deregistration DROP CONSTRAINT FK_1D447DE241CD9E7A');
        $this->addSql('DROP INDEX IDX_1D447DE241CD9E7A');
        $this->addSql('ALTER TABLE receipt_of_deregistration ALTER employer_id SET NOT NULL');
    }
}
