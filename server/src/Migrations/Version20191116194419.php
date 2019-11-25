<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191116194419 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE employers ALTER specialty_id DROP NOT NULL');
        $this->addSql('ALTER TABLE employers ADD CONSTRAINT FK_BF0147969A353316 FOREIGN KEY (specialty_id) REFERENCES specialty (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_BF0147969A353316 ON employers (specialty_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employers DROP CONSTRAINT FK_BF0147969A353316');
        $this->addSql('DROP INDEX IDX_BF0147969A353316');
        $this->addSql('ALTER TABLE employers ALTER specialty_id SET NOT NULL');
    }
}
