var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Chimique, Fragile } from "./produit.js";
var Cargaison = /** @class */ (function () {
    function Cargaison(distance) {
        this.distance = distance;
        this.produits = [];
    }
    Cargaison.prototype.ajouterProduit = function (produit) {
        if (this.produits.length >= 10000) {
            throw new Error("Une cargaison ne peut pas contenir plus de 10000 produits.");
        }
        this.produits.push(produit);
    };
    Cargaison.prototype.getProduits = function () {
        return this.produits;
    };
    return Cargaison;
}());
export { Cargaison };
var Aerien = /** @class */ (function (_super) {
    __extends(Aerien, _super);
    function Aerien() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Aerien.prototype.ajouterProduit = function (produit) {
        if (produit instanceof Chimique) {
            throw new Error("Les produits chimiques doivent toujours transiter par voie maritime.");
        }
        _super.prototype.ajouterProduit.call(this, produit);
    };
    return Aerien;
}(Cargaison));
var Maritime = /** @class */ (function (_super) {
    __extends(Maritime, _super);
    function Maritime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Maritime;
}(Cargaison));
var Terrestre = /** @class */ (function (_super) {
    __extends(Terrestre, _super);
    function Terrestre() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Terrestre.prototype.ajouterProduit = function (produit) {
        if (produit instanceof Chimique) {
            throw new Error("Les produits chimiques doivent toujours transiter par voie maritime.");
        }
        if (produit instanceof Fragile) {
            throw new Error("Les produits fragiles ne doivent jamais passer par voie maritime.");
        }
        _super.prototype.ajouterProduit.call(this, produit);
    };
    return Terrestre;
}(Cargaison));
export { Aerien, Maritime, Terrestre };
