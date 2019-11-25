<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191117143516 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT FK_F40CFC63FF3ED4A8');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER identity_id SET NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT FK_F40CFC63FF3ED4A8 FOREIGN KEY (identity_id) REFERENCES identity (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT fk_f40cfc63ff3ed4a8');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER identity_id DROP NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT fk_f40cfc63ff3ed4a8 FOREIGN KEY (identity_id) REFERENCES identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
