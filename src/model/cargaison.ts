import { Produit,Chimique, Fragile } from "./produit.js";

export abstract class Cargaison {
    private produits: Produit[] = [];
  
    constructor(public distance: number) {}
  
    ajouterProduit(produit: Produit): void {
      if (this.produits.length >= 10) {
        throw new Error("Une cargaison ne peut pas contenir plus de 10 produits.");
      }
      this.produits.push(produit);
    }
  
    getProduits(): Produit[] {
      return this.produits;
    }
  }

  class Aerien extends Cargaison {
    ajouterProduit(produit: Produit): void {
      if (produit instanceof Chimique) {
        throw new Error("Les produits chimiques doivent toujours transiter par voie maritime.");
      }
      super.ajouterProduit(produit);
    }
  }
  
  class Maritime extends Cargaison {}
  
  class Terrestre extends Cargaison {
    ajouterProduit(produit: Produit): void {
      if (produit instanceof Chimique) {
        throw new Error("Les produits chimiques doivent toujours transiter par voie maritime.");
      }
      if (produit instanceof Fragile) {
        throw new Error("Les produits fragiles ne doivent jamais passer par voie maritime.");
      }
      super.ajouterProduit(produit);
    }
  }
  export {Aerien, Maritime, Terrestre };  