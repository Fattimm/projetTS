"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terrestre = exports.Maritime = exports.Aerien = exports.Cargaison = void 0;
const produit_js_1 = require("./produit.js");
class Cargaison {
    constructor(distance) {
        this.distance = distance;
        this.produits = [];
    }
    ajouterProduit(produit) {
        if (this.produits.length >= 10) {
            throw new Error("Une cargaison ne peut pas contenir plus de 10 produits.");
        }
        this.produits.push(produit);
    }
    getProduits() {
        return this.produits;
    }
}
exports.Cargaison = Cargaison;
class Aerien extends Cargaison {
    ajouterProduit(produit) {
        if (produit instanceof produit_js_1.Chimique) {
            throw new Error("Les produits chimiques doivent toujours transiter par voie maritime.");
        }
        super.ajouterProduit(produit);
    }
}
exports.Aerien = Aerien;
class Maritime extends Cargaison {
}
exports.Maritime = Maritime;
class Terrestre extends Cargaison {
    ajouterProduit(produit) {
        if (produit instanceof produit_js_1.Chimique) {
            throw new Error("Les produits chimiques doivent toujours transiter par voie maritime.");
        }
        if (produit instanceof produit_js_1.Fragile) {
            throw new Error("Les produits fragiles ne doivent jamais passer par voie maritime.");
        }
        super.ajouterProduit(produit);
    }
}
exports.Terrestre = Terrestre;
//# sourceMappingURL=cargaison.js.map