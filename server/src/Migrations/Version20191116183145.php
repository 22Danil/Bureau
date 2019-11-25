<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191116183145 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE employers DROP CONSTRAINT fk_bf014796f3847a8a');
        $this->addSql('DROP INDEX idx_bf014796f3847a8a');
        $this->addSql('ALTER TABLE employers RENAME COLUMN position_id_id TO position_id');
        $this->addSql('ALTER TABLE employers ADD CONSTRAINT FK_BF014796DD842E46 FOREIGN KEY (position_id) REFERENCES position (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_BF014796DD842E46 ON employers (position_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employers DROP CONSTRAINT FK_BF014796DD842E46');
        $this->addSql('DROP INDEX IDX_BF014796DD842E46');
        $this->addSql('ALTER TABLE employers RENAME COLUMN position_id TO position_id_id');
        $this->addSql('ALTER TABLE employers ADD CONSTRAINT fk_bf014796f3847a8a FOREIGN KEY (position_id_id) REFERENCES "position" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_bf014796f3847a8a ON employers (position_id_id)');
    }
}
