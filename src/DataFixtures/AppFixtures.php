<?php

namespace App\DataFixtures;

use App\Entity\Article;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $article = new Article();
        $article
            ->setLabel("excalibur")
            ->setDescription("Excalibur est l'épée magique légendaire du roi Arthur, le roi des Bretons, dans les textes de la légende arthurienne de la matière de Bretagne rédigés à l'époque du Moyen Âge.

Certains considèrent qu'Excalibur et l'Épée du Rocher (preuve du lignage d'Arthur) ne sont qu'une seule et même arme, mais dans la plupart des versions de la légende ce sont bien deux épées distinctes.

Excalibur a la réputation d'être incassable et de trancher toute matière. Son fourreau protège son porteur de toute blessure. Le roi Arthur, détenant les deux artéfacts, était donc invincible sur les champs de bataille. ")
            ->setPrice(999)
            ->setPhoto("img/excalibur.jpg");
        $manager->persist($article);
        $manager->flush();
    }
}
