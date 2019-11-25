<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191117090332 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT fk_f40cfc6381760ad2');
        $this->addSql('DROP INDEX idx_f40cfc6381760ad2');
        $this->addSql('ALTER TABLE receipt_of_registration RENAME COLUMN coincidence_id TO employer_id');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT FK_F40CFC6341CD9E7A FOREIGN KEY (employer_id) REFERENCES employers (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F40CFC6341CD9E7A ON receipt_of_registration (employer_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT FK_F40CFC6341CD9E7A');
        $this->addSql('DROP INDEX IDX_F40CFC6341CD9E7A');
        $this->addSql('ALTER TABLE receipt_of_registration RENAME COLUMN employer_id TO coincidence_id');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT fk_f40cfc6381760ad2 FOREIGN KEY (coincidence_id) REFERENCES employers (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_f40cfc6381760ad2 ON receipt_of_registration (coincidence_id)');
    }
}
