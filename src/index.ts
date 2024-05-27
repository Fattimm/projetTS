document.addEventListener('DOMContentLoaded', () => {
  // / <reference types="@types/google.maps" />

const popupButton = document.getElementById('popupButton') as HTMLButtonElement;
const addCargoPopup = document.getElementById('ajoutcargo') as HTMLDivElement;
const annulerButton = document.querySelector('#ajoutcargo button[type="button"]') as HTMLButtonElement;
const ajouterButton = document.querySelector('#ajoutcargo button[type="submit"]') as HTMLButtonElement;
const formulaireAjoutCargaison = document.getElementById('formulaireAjoutCargaison') as HTMLFormElement;
const cargoList = document.getElementById('cargoList') as HTMLTableSectionElement;

// const marker1LatInput = document.getElementById('marker1Lat') as HTMLInputElement;
// const marker1LngInput = document.getElementById('marker1Lng') as HTMLInputElement;
// const marker2LatInput = document.getElementById('marker2Lat') as HTMLInputElement;
// const marker2LngInput = document.getElementById('marker2Lng') as HTMLInputElement;
// const lieu_depart = document.getElementById('lieuDepart') as HTMLInputElement;
// const lieu_arrivee = document.getElementById('lieuArrivee') as HTMLInputElement;
// const Nombre_produits = document.getElementById('Nombre_produits') as HTMLInputElement;



const togglePopup = (show: boolean) => {
  if (addCargoPopup) {
    addCargoPopup.classList.toggle('hidden', !show);
    document.body.classList.toggle('overflow-hidden', show);
  }
};


popupButton.addEventListener('click', () => togglePopup(true));


annulerButton.addEventListener('click', () => togglePopup(false));


formulaireAjoutCargaison.addEventListener('submit', (event) => {
  event.preventDefault();

  const donneesFormulaire = recupererDonneesFormulaire();
  enregistrerDonneesDansJSON(donneesFormulaire);

  // Crée une nouvelle ligne dans le tableau avec les données du formulaire
  const row = document.createElement('tr');
  row.innerHTML = `
      <td class="w-1/12 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('${donneesFormulaire.id}')"></td>
      <td class="w-1/12 py-3 px-4">${donneesFormulaire.id}</td>
      <td class="w-1/6 py-3 px-4">${donneesFormulaire.type}</td>
      <td class="w-1/6 py-3 px-4">${donneesFormulaire.lieu_depart}</td>
      <td class="w-1/6 py-3 px-4">${donneesFormulaire.lieu_arriver}</td>
      <td class="w-1/4 py-3 px-4">${donneesFormulaire.Nombre_produits}</td>
      <td class="w-1/6 py-3 px-4">${donneesFormulaire.statut}</td>
      <td class="w-1/6 py-3 px-4">${donneesFormulaire.etat}</td>
  `;
  
  cargoList.appendChild(row);
  
  formulaireAjoutCargaison.reset();

  // // Réinitialise les marqueurs sur la carte
  // if (marker1) {
  //     marker1.setMap(null);
  //     marker1 = null;
  // }
  // if (marker2) {
  //     marker2.setMap(null);
  //     marker2 = null;
  // }
  
  togglePopup(false);
});
 

// let map: google.maps.Map;
// let marker1: google.maps.Marker | null = null;
// let marker2: google.maps.Marker | null = null;

// function initMap(): void {
//   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//     center: { lat: 0, lng: 0 },
//     zoom: 3,
//   });

//   map.addListener("click", (e: google.maps.MapMouseEvent) => {
//     if (!marker1) {
//       marker1 = new google.maps.Marker({
//         position: e.latLng!,
//         map,
//         draggable: true,
//       });
//       marker1.addListener('dragend', updatePositions);
//       updatePositions();
//     } else if (!marker2) {
//       marker2 = new google.maps.Marker({
//         position: e.latLng!,
//         map,
//         draggable: true,
//       });
//       marker2.addListener('dragend', updatePositions);
//       updatePositions();
//     }
//   });
// }

// function updatePositions(): void {
//   if (marker1 && marker1.getPosition()) {
//     const position1 = marker1.getPosition();
//     marker1LatInput.value = position1.lat().toFixed(6);
//     marker1LngInput.value = position1.lng().toFixed(6);
//     lieuDepartInput.value = `Lat: ${position1.lat().toFixed(6)}, Lng: ${position1.lng().toFixed(6)}`;
//   }

//   if (marker2 && marker2.getPosition()) {
//     const position2 = marker2.getPosition();
//     marker2LatInput.value = position2.lat().toFixed(6);
//     marker2LngInput.value = position2.lng().toFixed(6);
//     lieuArriveeInput.value = `Lat: ${position2.lat().toFixed(6)}, Lng: ${position2.lng().toFixed(6)}`;
//   }
// }





function chargerDonneesJSON() {
  fetch('./data.json')
      .then(response => response.json())
      .then(data => {
          
          data.cargaison.forEach((cargaison: any) => {
              const row = document.createElement('tr');

              row.innerHTML = `
                  <td class="w-1/12 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('${cargaison.id}')"></td>
                  <td class="w-1/12 py-3 px-4">${cargaison.id}</td>
                  <td class="w-1/6 py-3 px-4">${cargaison.type}</td>
                  <td class="w-1/6 py-3 px-4">${cargaison.lieu_depart}</td>
                  <td class="w-1/6 py-3 px-4">${cargaison.lieu_arriver}</td>
                  <td class="w-1/4 py-3 px-4">${cargaison.Nombre_produits}</td>
                  <td class="w-1/6 py-3 px-4">${cargaison.statut}</td>
                  <td class="w-1/6 py-3 px-4">${cargaison.etat}</td>
              `;

             
              cargoList.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Erreur lors du chargement des données JSON :', error);
      });
}

window.addEventListener('load', chargerDonneesJSON);


let currentId = 1;


function recupererDonneesFormulaire(): any {
  const formData = new FormData(formulaireAjoutCargaison);
  const id = currentId.toString();
  currentId++; 
  const nombreProduits = formData.get('Nombre_produits') as string;
  const lieuDepart = (document.getElementById('lieuDepart') as HTMLInputElement).value; 
  const lieuArrivee = (document.getElementById('lieuArrivee') as HTMLInputElement).value;
  return {
    id: id,
    type: formData.get('typeCargaison') as string,
    lieu_depart: lieuDepart,
    lieu_arriver: lieuArrivee,
    Nombre_produits: nombreProduits,
    statut: formData.get('status') as string,
    etat: formData.get('etat') as string
  };
}



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


});
