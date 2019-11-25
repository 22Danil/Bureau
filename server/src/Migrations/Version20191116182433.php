<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191116182433 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE employers ADD position_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE employers DROP position_id');
        $this->addSql('ALTER TABLE employers ADD CONSTRAINT FK_BF014796F3847A8A FOREIGN KEY (position_id_id) REFERENCES position (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_BF014796F3847A8A ON employers (position_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employers DROP CONSTRAINT FK_BF014796F3847A8A');
        $this->addSql('DROP INDEX IDX_BF014796F3847A8A');
        $this->addSql('ALTER TABLE employers ADD position_id INT NOT NULL');
        $this->addSql('ALTER TABLE employers DROP position_id_id');
    }
}
