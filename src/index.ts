import { Alimentaire, Chimique, Fragile, Incassable } from './model/produit.js';
import { Aerien, Maritime, Terrestre } from './model/cargaison.js';
document.addEventListener('DOMContentLoaded', () => {
  const popupButton = document.getElementById('popupButton')! as HTMLButtonElement;
  const addCargoPopup = document.getElementById('ajoutcargo') as HTMLDivElement;
  const annulerButton = document.querySelector('#ajoutcargo button[type="button"]') as HTMLButtonElement;
  const ajouterButton = document.querySelector('#ajoutcargo button[type="submit"]') as HTMLButtonElement;
  const formulaireAjoutCargaison = document.getElementById('formulaireAjoutCargaison') as HTMLFormElement;
  const cargoList = document.getElementById('cargoList') as HTMLTableSectionElement;
  const dateDepartError = document.getElementById('dateDepartError') as HTMLParagraphElement;
  const dateArriveeError = document.getElementById('dateArriveeError') as HTMLParagraphElement;

  //POUR GERER LE POIDS ET LE NOMBRE DE PRODUITS_________________________________________________________________
  const poidsField = document.getElementById('poidsField') as HTMLDivElement;
  const nombreProduitsField = document.getElementById('nombreProduitsField') as HTMLDivElement;
  const statusSelect = document.getElementById('status') as HTMLSelectElement;

  const toggleFieldsVisibility = (selectedValue: string) => {
    if (selectedValue === 'poids') {
      poidsField.classList.remove('hidden');
      nombreProduitsField.classList.add('hidden');
    } else if (selectedValue === 'nombre_produits') {
      nombreProduitsField.classList.remove('hidden');
      poidsField.classList.add('hidden');
    }
  };

  statusSelect.addEventListener('change', () => toggleFieldsVisibility(statusSelect.value));
  toggleFieldsVisibility(statusSelect.value);

  const togglePopup = (show: boolean) => {
    if (addCargoPopup) {
      addCargoPopup.classList.toggle('hidden', !show);
      document.body.classList.toggle('overflow-hidden', show);
    }
  };
  popupButton.addEventListener('click', () => togglePopup(true));
  annulerButton.addEventListener('click', () => togglePopup(false));


  // FONCTION POUR VALIDER DATES_______________________________________________________________________
  const validateDates = (dateDepart: string, dateArrivee: string): boolean => {
    let isValid = true;
    const today = new Date().setHours(0, 0, 0, 0); // Date d'aujourd'hui à minuit
    const depart = new Date(dateDepart).setHours(0, 0, 0, 0); // Date de départ à minuit
    const arrivee = new Date(dateArrivee).setHours(0, 0, 0, 0); // Date d'arrivée à minuit

    dateDepartError.textContent = '';
    dateArriveeError.textContent = '';

    if (depart < today) {
      dateDepartError.textContent = 'La date de départ ne peut pas être antérieure à aujourd\'hui.';
      isValid = false;
    }
    if (depart >= arrivee) {
      dateArriveeError.textContent = 'La date de départ doit être antérieure à la date d\'arrivée.';
      isValid = false;
    }
    return isValid;
  };


  //AJOUTER CARGAISON ____________________________________________________________________________________________
  formulaireAjoutCargaison.addEventListener('submit', (event) => {
    event.preventDefault();

    const dateDepart = (document.getElementById('dateDepart') as HTMLInputElement).value;
    const dateArrivee = (document.getElementById('dateArrivee') as HTMLInputElement).value;

    const donneesFormulaire = recupererDonneesFormulaire();
    donneesFormulaire.status = 'Ouvert';
    donneesFormulaire.etat = 'Attente';

    enregistrerDonneesDansJSON(donneesFormulaire);


    // Vérifier si les dates sont valides
    if (!validateDates(dateDepart, dateArrivee)) {
      return;
    }

    const row = document.createElement('tr');
    // row.id = donneesFormulaire.id;
    row.innerHTML = `
      <td class="w-1/11 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('${donneesFormulaire.id}')"></td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.id}</td>
      <td class="w-1/11 py-3 px-4 type">${donneesFormulaire.type}</td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.lieu_depart}</td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.lieu_arriver}</td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.date_depart}</td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.date_arriver}</td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.Nombre_produits}  ${donneesFormulaire.poids} kg</td>
      <td class="w-1/11 py-3 px-4">${donneesFormulaire.distance}</td>
      <td class="w-2/11 py-2 px-3 bg-gray-100 text-gray-700  status ">${donneesFormulaire.status}</td>
      <td class="w-2/11 py-2 px-3 bg-gray-100 text-gray-700  etat ">${donneesFormulaire.etat}</td>
      <td class="w-2/11 py-2 px-3 "><button class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white font-bold modifybtn">Modifier</button></td>
      <td class="w-2/11 py-2 px-3 "><button class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white font-bold">Details</button></td>

  `;

    cargoList.appendChild(row);
    formulaireAjoutCargaison.reset();
    togglePopup(false);

  });


  //FONCTION POUR CHARGER LES DONNÉES DANS JSON ____________________________________________________________________
  function chargerDonneesJSON() {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        cargoList.innerHTML = ''; // Efface le contenu existant du tableau

        data.cargaison.forEach((cargaison: any) => {
          const row = document.createElement('tr');

          row.innerHTML = `
                  <td class="w-1/11 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('${cargaison.id}')"></td>
                  <td class="w-1/11 py-3 px-4">${cargaison.id}</td>
                  <td class="w-1/11 py-3 px-4 type">${cargaison.type}</td>
                  <td class="w-1/11 py-3 px-4">${cargaison.lieu_depart}</td>
                  <td class="w-1/11 py-3 px-4">${cargaison.lieu_arriver}</td>
                  <td class="w-1/11 py-3 px-4">${cargaison.date_depart}</td>
                  <td class="w-1/11 py-3 px-4">${cargaison.date_arriver}</td>
                  <td class="w-1/11 py-3 px-4">${cargaison.Nombre_produits}  ${cargaison.poids} kg</td>
                  <td class="w-1/11 py-3 px-4">${cargaison.distance}</td>
                  <td class="w-2/11 py-2 px-3 bg-gray-100 text-gray-700  status ">${cargaison.status}</td>
                  <td class="w-2/11 py-2 px-3 bg-gray-100 text-gray-700  etat ">${cargaison.etat}</td>
                  <td class="w-2/11 py-2 px-3 "><button class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white font-bold modifybtn">Modifier</button></td>
                  <td class="w-2/11 py-2 px-3 "><button class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white font-bold">Details</button></td>

              `;

          cargoList.appendChild(row); // Ajoute la nouvelle ligne au tableau
        });
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données JSON :', error);
      });
  }

  window.addEventListener('load', chargerDonneesJSON);

  //FONCTION POUR GENERER UN ID ALÉATOIRE
  function generateRandomId(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  //FONCTION POUR RÉCUPÉRER LES DONNÉES DU FORMULAIE _______________________________________________________________
  function recupererDonneesFormulaire(): any {
    const formData = new FormData(formulaireAjoutCargaison);
    const id = generateRandomId(5); // Génère un ID de 5 chiffres

    const nombreProduits = formData.get('nombreProduits') as string | null;
    const poids = formData.get('poids') as string | null;

    const lieuDepart = (document.getElementById('lieuDepart') as HTMLInputElement).value;
    const lieuArrivee = (document.getElementById('lieuArrivee') as HTMLInputElement).value;
    const dateDepart = (document.getElementById('dateDepart') as HTMLInputElement).value;
    const dateArrivee = (document.getElementById('dateArrivee') as HTMLInputElement).value;


    return {
      id: id,
      type: formData.get('typeCargaison') as string,
      lieu_depart: lieuDepart,
      lieu_arriver: lieuArrivee,
      date_depart: dateDepart,
      date_arriver: dateArrivee,
      distance: formData.get('distance') as string,
      Nombre_produits: nombreProduits,
      poids: poids,
      status: formData.get('status') as string,
      etat: formData.get('etat') as string,
      produits:[]
    };
  }


  //FONCTION POUR ENREGISTRER LES DONNÉES DANS JSON ______________________________________________________________________
  function enregistrerDonneesDansJSON(data: any) {
    fetch('./php/sauvegarder_donnees_json.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.text().then(text => ({ status: response.status, text })))
      .then(({ status, text }) => {
        try {
          const body = JSON.parse(text);
          if (status === 200) {
            console.log('Données sauvegardées avec succès');
          } else {
            console.error(`Échec de la sauvegarde des données : ${body.message}`);
          }
        } catch (error) {
          console.error('Erreur lors de la sauvegarde des données :', text);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde des données :', error);
      });
  }


  //PAGINATION______________________________________________________________________________

  interface Cargo {
    id: number;
    type: string;
    lieu_depart: string;
    lieu_arriver: string;
    date_depart: string;
    date_arriver: string;
    distance: number;
    Nombre_produits?: number;
    poids?: number;
    status: string;
    etat: string;
    produits:[]
  }
  const itemsPerPageStorageKey = 'itemsPerPage';
  let currentPage = 1; // Page actuelle, initialisée à 1
  let itemsPerPage = parseInt(localStorage.getItem(itemsPerPageStorageKey) || '2');

  const pagination = document.getElementById('pagination')!;

  let cargaisonData: Cargo[] = [];
  // Fonction pour mettre à jour le nombre d'éléments par page
  const updateItemsPerPage = (newItemsPerPage: number) => {
    itemsPerPage = newItemsPerPage;
    localStorage.setItem(itemsPerPageStorageKey, newItemsPerPage.toString());
    updateDisplay();
  };

  // Charger les données depuis le fichier JSON
  const loadData = async () => {
    try {
      const response = await fetch('./data.json');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      const data = await response.json();
      cargaisonData = data.cargaison;
      updateDisplay();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Afficher les éléments de la page spécifiée
  const displayItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = cargaisonData.slice(startIndex, endIndex);

    cargoList.innerHTML = ''; // Réinitialiser la liste

    currentItems.forEach(cargo => {
      const cargoRow = document.createElement('tr');
      cargoRow.innerHTML = `
      <td class="w-1/11 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('${cargo.id}')"></td>
      <td class="w-1/11 py-3 px-4">${cargo.id}</td>
      <td class="w-1/11 py-3 px-4 type">${cargo.type}</td>
      <td class="w-1/11 py-3 px-4">${cargo.lieu_depart}</td>
      <td class="w-1/11 py-3 px-4">${cargo.lieu_arriver}</td>
      <td class="w-1/11 py-3 px-4">${cargo.date_depart}</td>
      <td class="w-1/11 py-3 px-4">${cargo.date_arriver}</td>
      <td class="w-1/11 py-3 px-4">${cargo.Nombre_produits}  ${cargo.poids} kg</td>
      <td class="w-1/11 py-3 px-4">${cargo.distance}</td>
      <td class="w-2/11 py-2 px-3 bg-gray-100 text-gray-700  status ">${cargo.status}</td>
      <td class="w-2/11 py-2 px-3 bg-gray-100 text-gray-700  etat ">${cargo.etat}</td>
      <td class="w-2/11 py-2 px-3"><button class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white font-bold modifybtn">Modifier</button></td>
      <td class="w-2/11 py-2 px-3"><button class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white font-bold">Details</button></td>
      `;
      cargoList.appendChild(cargoRow);


      const modifyButton = document.querySelector('.modifybtn') as HTMLButtonElement;
      modifyButton.addEventListener('click', () => {
        openModifyPopup(cargo);
      });
    });
  };

  // Mettre à jour l'affichage en fonction de la page actuelle
  const updateDisplay = () => {
    displayItems();
    renderPagination();
  };
  displayItems();
  // Afficher les boutons de pagination
  const renderPagination = () => {
    pagination.innerHTML = ''; // Réinitialiser la pagination

    const numPages = Math.ceil(cargaisonData.length / itemsPerPage);
    for (let i = 1; i <= numPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i.toString();
      pageButton.classList.add('px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded');
      if (i === currentPage) {
        pageButton.classList.add('bg-blue-700');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i;
        updateDisplay();
      });
      pagination.appendChild(pageButton);
    }
  };
  // Charger les données et afficher la première page au chargement de la page
  loadData();


  //POUR MODIFIER LES INFOS D'UNE CARGO___________________________________________________________________
  const modifyCargoPopup = document.getElementById('modifyCargoPopup') as HTMLDivElement;
  const modifyForm = document.getElementById('modifyForm') as HTMLFormElement;

  const openModifyPopup = (cargo: Cargo) => {
    // Remplir le formulaire avec les informations de la cargaison
    (modifyForm.querySelector('#modifyId') as HTMLInputElement).value = cargo.id.toString();
    (modifyForm.querySelector('#modifyType') as HTMLInputElement).value = cargo.type;
    (modifyForm.querySelector('#modifyLieuDepart') as HTMLInputElement).value = cargo.lieu_depart;
    (modifyForm.querySelector('#modifyLieuArriver') as HTMLInputElement).value = cargo.lieu_arriver;
    (modifyForm.querySelector('#modifyDateDepart') as HTMLInputElement).value = cargo.date_depart;
    (modifyForm.querySelector('#modifyDateArriver') as HTMLInputElement).value = cargo.date_arriver;
    (modifyForm.querySelector('#modifyNombreProduits') as HTMLInputElement).value = cargo.Nombre_produits?.toString() || '';
    (modifyForm.querySelector('#poids') as HTMLInputElement).value = cargo.poids?.toString() || '';
    (modifyForm.querySelector('#modifyDistance') as HTMLInputElement).value = cargo.distance.toString();
    (modifyForm.querySelector('#modifyStatus') as HTMLSelectElement).value = cargo.status;
    (modifyForm.querySelector('#modifyEtat') as HTMLSelectElement).value = cargo.etat;

    // Afficher le pop-up
    modifyCargoPopup.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  const closeModifyPopup = () => {
    modifyCargoPopup.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  document.getElementById('modifyCancelButton')?.addEventListener('click', closeModifyPopup);


  //EVENEMENT POUR LE BOUTON SUBMIT DU POPUP
  modifyForm.addEventListener('click', (event) => {
    event.preventDefault();

    const updatedCargo: Cargo = {
      id: parseInt((modifyForm.querySelector('#modifyId') as HTMLInputElement).value),
      type: (modifyForm.querySelector('#modifyType') as HTMLInputElement).value,
      lieu_depart: (modifyForm.querySelector('#modifyLieuDepart') as HTMLInputElement).value,
      lieu_arriver: (modifyForm.querySelector('#modifyLieuArriver') as HTMLInputElement).value,
      date_depart: (modifyForm.querySelector('#modifyDateDepart') as HTMLInputElement).value,
      date_arriver: (modifyForm.querySelector('#modifyDateArriver') as HTMLInputElement).value,
      distance: parseInt((modifyForm.querySelector('#modifyDistance') as HTMLInputElement).value),
      Nombre_produits: parseInt((modifyForm.querySelector('#modifyNombreProduits') as HTMLInputElement).value),
      poids: parseInt((modifyForm.querySelector('#modifypoids') as HTMLInputElement).value),
      status: (modifyForm.querySelector('#modifyStatus') as HTMLSelectElement).value,
      etat: (modifyForm.querySelector('#modifyEtat') as HTMLSelectElement).value,
      produits:[]
    };

    // Mise à jour des données cargaison
    cargaisonData = cargaisonData.map(cargo =>
      cargo.id === updatedCargo.id ? updatedCargo : cargo
    );

    // Sauvegarde des données dans le fichier JSON
    enregistrerDonneesDansJSON({ cargaison: cargaisonData });

    // Mettre à jour l'affichage et fermer le pop-up
    updateDisplay();
    closeModifyPopup();
  });


  //REDIRECTION_____________________________________________________________________________

  (window as any).redirectTocargaison = (cargoId: string): void => {
    window.location.href = `pages/cargaison.php?id=${cargoId}`;
  };
  updateDisplay();


});


