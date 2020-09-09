<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200908130835 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE panier ADD product_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE panier ADD CONSTRAINT FK_24CC0DF2DE18E50B FOREIGN KEY (product_id_id) REFERENCES article (id)');
        $this->addSql('CREATE INDEX IDX_24CC0DF2DE18E50B ON panier (product_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE panier DROP FOREIGN KEY FK_24CC0DF2DE18E50B');
        $this->addSql('DROP INDEX IDX_24CC0DF2DE18E50B ON panier');
        $this->addSql('ALTER TABLE panier DROP product_id_id');
    }
}
