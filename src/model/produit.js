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
var Produit = /** @class */ (function () {
    function Produit(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    return Produit;
}());
export { Produit };
var Alimentaire = /** @class */ (function (_super) {
    __extends(Alimentaire, _super);
    function Alimentaire(libelle, poids) {
        return _super.call(this, libelle, poids) || this;
    }
    return Alimentaire;
}(Produit));
var Chimique = /** @class */ (function (_super) {
    __extends(Chimique, _super);
    function Chimique(libelle, poids, degreToxicite) {
        var _this = _super.call(this, libelle, poids) || this;
        _this.degreToxicite = degreToxicite;
        return _this;
    }
    return Chimique;
}(Produit));
var Materiel = /** @class */ (function (_super) {
    __extends(Materiel, _super);
    function Materiel(libelle, poids) {
        return _super.call(this, libelle, poids) || this;
    }
    return Materiel;
}(Produit));
var Fragile = /** @class */ (function (_super) {
    __extends(Fragile, _super);
    function Fragile(libelle, poids) {
        return _super.call(this, libelle, poids) || this;
    }
    return Fragile;
}(Materiel));
var Incassable = /** @class */ (function (_super) {
    __extends(Incassable, _super);
    function Incassable(libelle, poids) {
        return _super.call(this, libelle, poids) || this;
    }
    return Incassable;
}(Materiel));
export { Alimentaire, Chimique, Fragile, Incassable };
