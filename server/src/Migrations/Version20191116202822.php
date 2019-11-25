<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191116202822 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE receipt_of_registration ALTER specialty_id DROP NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER position_id DROP NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT FK_F40CFC639A353316 FOREIGN KEY (specialty_id) REFERENCES specialty (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT FK_F40CFC63DD842E46 FOREIGN KEY (position_id) REFERENCES position (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F40CFC639A353316 ON receipt_of_registration (specialty_id)');
        $this->addSql('CREATE INDEX IDX_F40CFC63DD842E46 ON receipt_of_registration (position_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT FK_F40CFC639A353316');
        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT FK_F40CFC63DD842E46');
        $this->addSql('DROP INDEX IDX_F40CFC639A353316');
        $this->addSql('DROP INDEX IDX_F40CFC63DD842E46');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER specialty_id SET NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER position_id SET NOT NULL');
    }
}
