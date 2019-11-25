<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191117130403 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE receipt_of_deregistration ALTER identity_id DROP NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_deregistration ADD CONSTRAINT FK_1D447DE2FF3ED4A8 FOREIGN KEY (identity_id) REFERENCES identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1D447DE2FF3ED4A8 ON receipt_of_deregistration (identity_id)');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER identity_id DROP NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration ADD CONSTRAINT FK_F40CFC63FF3ED4A8 FOREIGN KEY (identity_id) REFERENCES identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F40CFC63FF3ED4A8 ON receipt_of_registration (identity_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE receipt_of_deregistration DROP CONSTRAINT FK_1D447DE2FF3ED4A8');
        $this->addSql('DROP INDEX IDX_1D447DE2FF3ED4A8');
        $this->addSql('ALTER TABLE receipt_of_deregistration ALTER identity_id SET NOT NULL');
        $this->addSql('ALTER TABLE receipt_of_registration DROP CONSTRAINT FK_F40CFC63FF3ED4A8');
        $this->addSql('DROP INDEX IDX_F40CFC63FF3ED4A8');
        $this->addSql('ALTER TABLE receipt_of_registration ALTER identity_id SET NOT NULL');
    }
}
