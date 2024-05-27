"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incassable = exports.Fragile = exports.Chimique = exports.Alimentaire = exports.Produit = void 0;
class Produit {
    constructor(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
}
exports.Produit = Produit;
class Alimentaire extends Produit {
    constructor(libelle, poids) {
        super(libelle, poids);
    }
}
exports.Alimentaire = Alimentaire;
class Chimique extends Produit {
    constructor(libelle, poids, degreToxicite) {
        super(libelle, poids);
        this.degreToxicite = degreToxicite;
    }
}
exports.Chimique = Chimique;
class Materiel extends Produit {
    constructor(libelle, poids) {
        super(libelle, poids);
    }
}
class Fragile extends Materiel {
    constructor(libelle, poids) {
        super(libelle, poids);
    }
}
exports.Fragile = Fragile;
class Incassable extends Materiel {
    constructor(libelle, poids) {
        super(libelle, poids);
    }
}
exports.Incassable = Incassable;
//# sourceMappingURL=produit.js.map