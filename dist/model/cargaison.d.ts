import { Produit } from "./produit.js";
export declare abstract class Cargaison {
    distance: number;
    private produits;
    constructor(distance: number);
    ajouterProduit(produit: Produit): void;
    getProduits(): Produit[];
}
declare class Aerien extends Cargaison {
    ajouterProduit(produit: Produit): void;
}
declare class Maritime extends Cargaison {
}
declare class Terrestre extends Cargaison {
    ajouterProduit(produit: Produit): void;
}
export { Aerien, Maritime, Terrestre };
