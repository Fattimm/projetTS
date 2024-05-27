export abstract class Produit {
    constructor(public libelle: string, public poids: number) {}
  }
  
  class Alimentaire extends Produit {
    constructor(libelle: string, poids: number) {
      super(libelle, poids);
    }
  }
  
  class Chimique extends Produit {
    constructor(libelle: string, poids: number, public degreToxicite: number) {
      super(libelle, poids);
    }
  }
  
  abstract class Materiel extends Produit {
    constructor(libelle: string, poids: number) {
      super(libelle, poids);
    }
  }
  
  class Fragile extends Materiel {
    constructor(libelle: string, poids: number) {
      super(libelle, poids);
    }
  }
  
  class Incassable extends Materiel {
    constructor(libelle: string, poids: number) {
      super(libelle, poids);
    }
  }

  export { Alimentaire, Chimique, Fragile, Incassable};