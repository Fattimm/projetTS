export declare abstract class Produit {
    libelle: string;
    poids: number;
    constructor(libelle: string, poids: number);
}
declare class Alimentaire extends Produit {
    constructor(libelle: string, poids: number);
}
declare class Chimique extends Produit {
    degreToxicite: number;
    constructor(libelle: string, poids: number, degreToxicite: number);
}
declare abstract class Materiel extends Produit {
    constructor(libelle: string, poids: number);
}
declare class Fragile extends Materiel {
    constructor(libelle: string, poids: number);
}
declare class Incassable extends Materiel {
    constructor(libelle: string, poids: number);
}
export { Alimentaire, Chimique, Fragile, Incassable };
