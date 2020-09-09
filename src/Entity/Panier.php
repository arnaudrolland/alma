<?php

namespace App\Entity;

use App\Repository\PanierRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PanierRepository::class)
 * 
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"paniers_read"}
 *  }
 * )
 */
class Panier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"paniers_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"paniers_read"})
     */
    private $quantity;

    /**
     * @ORM\ManyToOne(targetEntity=Article::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"paniers_read"})
     * 
     */
    private $productId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getProductId(): ?Article
    {
        return $this->productId;
    }

    public function setProductId(?Article $productId): self
    {
        $this->productId = $productId;

        return $this;
    }
}
