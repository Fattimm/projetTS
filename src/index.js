var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var popupButton = document.getElementById('popupButton');
    var addCargoPopup = document.getElementById('ajoutcargo');
    var annulerButton = document.querySelector('#ajoutcargo button[type="button"]');
    var ajouterButton = document.querySelector('#ajoutcargo button[type="submit"]');
    var formulaireAjoutCargaison = document.getElementById('formulaireAjoutCargaison');
    var cargoList = document.getElementById('cargoList');
    var dateDepartError = document.getElementById('dateDepartError');
    var dateArriveeError = document.getElementById('dateArriveeError');
    //POUR GERER LE POIDS ET LE NOMBRE DE PRODUITS_________________________________________________________________
    var poidsField = document.getElementById('poidsField');
    var nombreProduitsField = document.getElementById('nombreProduitsField');
    var statusSelect = document.getElementById('status');
    var toggleFieldsVisibility = function (selectedValue) {
        if (selectedValue === 'poids') {
            poidsField.classList.remove('hidden');
            nombreProduitsField.classList.add('hidden');
        }
        else if (selectedValue === 'nombre_produits') {
            nombreProduitsField.classList.remove('hidden');
            poidsField.classList.add('hidden');
        }
    };
    statusSelect.addEventListener('change', function () { return toggleFieldsVisibility(statusSelect.value); });
    toggleFieldsVisibility(statusSelect.value);
    var togglePopup = function (show) {
        if (addCargoPopup) {
            addCargoPopup.classList.toggle('hidden', !show);
            document.body.classList.toggle('overflow-hidden', show);
        }
    };
    popupButton.addEventListener('click', function () { return togglePopup(true); });
    annulerButton.addEventListener('click', function () { return togglePopup(false); });
    // FONCTION POUR VALIDER DATES
    var validateDates = function (dateDepart, dateArrivee) {
        var isValid = true;
        var today = new Date().setHours(0, 0, 0, 0); // Date d'aujourd'hui à minuit
        var depart = new Date(dateDepart).setHours(0, 0, 0, 0); // Date de départ à minuit
        var arrivee = new Date(dateArrivee).setHours(0, 0, 0, 0); // Date d'arrivée à minuit
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
    formulaireAjoutCargaison.addEventListener('submit', function (event) {
        event.preventDefault();
        var dateDepart = document.getElementById('dateDepart').value;
        var dateArrivee = document.getElementById('dateArrivee').value;
        var donneesFormulaire = recupererDonneesFormulaire();
        donneesFormulaire.status = 'Ouvert';
        donneesFormulaire.etat = 'Attente';
        enregistrerDonneesDansJSON(donneesFormulaire);
        // Vérifier si les dates sont valides
        if (!validateDates(dateDepart, dateArrivee)) {
            return;
        }
        var row = document.createElement('tr');
        // row.id = donneesFormulaire.id;
        row.innerHTML = "\n      <td class=\"w-1/11 py-3 px-4\"><input type=\"checkbox\" onclick=\"redirectTocargaison('".concat(donneesFormulaire.id, "')\"></td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.id, "</td>\n      <td class=\"w-1/11 py-3 px-4 type\">").concat(donneesFormulaire.type, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.lieu_depart, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.lieu_arriver, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.date_depart, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.date_arriver, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.Nombre_produits || '', "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.distance, "</td>\n      <td class=\"w-2/11 py-2 px-3 bg-gray-100 text-gray-700  status \">").concat(donneesFormulaire.status, "</td>\n      <td class=\"w-2/11 py-2 px-3 bg-gray-100 text-gray-700  etat \">").concat(donneesFormulaire.etat, "</td>\n      <td class=\"w-2/11 py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold \">Modifier</td>\n      <td class=\"w-2/11 py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold \">Details</td>\n\n\n  ");
        cargoList.appendChild(row);
        formulaireAjoutCargaison.reset();
        togglePopup(false);
    });
    //FONCTION POUR CHARGER LES DONNÉES DANS JSON ____________________________________________________________________
    function chargerDonneesJSON() {
        fetch('./data.json')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            cargoList.innerHTML = ''; // Efface le contenu existant du tableau
            data.cargaison.forEach(function (cargaison) {
                var row = document.createElement('tr');
                row.innerHTML = "\n                  <td class=\"w-1/11 py-3 px-4\"><input type=\"checkbox\" onclick=\"redirectTocargaison('".concat(cargaison.id, "')\"></td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.id, "</td>\n                  <td class=\"w-1/11 py-3 px-4 type\">").concat(cargaison.type, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.lieu_depart, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.lieu_arriver, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.date_depart, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.date_arriver, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.Nombre_produits || '', "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.distance, "</td>\n                  <td class=\"w-2/11 py-2 px-3 bg-gray-100 text-gray-700  status \">").concat(cargaison.status, "</td>\n                  <td class=\"w-2/11 py-2 px-3 bg-gray-100 text-gray-700  etat \">").concat(cargaison.etat, "</td>\n                  <td class=\"w-2/11 py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  \">Modifier</td>\n                  <td class=\"w-2/11 py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  \">Details</td>\n\n              ");
                cargoList.appendChild(row); // Ajoute la nouvelle ligne au tableau
            });
        })
            .catch(function (error) {
            console.error('Erreur lors du chargement des données JSON :', error);
        });
    }
    window.addEventListener('load', chargerDonneesJSON);
    var currentId = 1;
    //FONCTION POUR RÉCUPÉRER LES DONNÉES DU FORMULAIE _______________________________________________________________
    function recupererDonneesFormulaire() {
        var formData = new FormData(formulaireAjoutCargaison);
        var id = currentId.toString();
        currentId++;
        var nombreProduits = formData.get('nombreProduits');
        var poids = formData.get('poids');
        var lieuDepart = document.getElementById('lieuDepart').value;
        var lieuArrivee = document.getElementById('lieuArrivee').value;
        var dateDepart = document.getElementById('dateDepart').value;
        var dateArrivee = document.getElementById('dateArrivee').value;
        return {
            id: id,
            type: formData.get('typeCargaison'),
            lieu_depart: lieuDepart,
            lieu_arriver: lieuArrivee,
            date_depart: dateDepart,
            date_arriver: dateArrivee,
            distance: formData.get('distance'),
            Nombre_produits: nombreProduits,
            status: formData.get('status'),
            etat: formData.get('etat')
        };
    }
    //FONCTION POUR ENREGISTRER LES DONNÉES DANS JSON ______________________________________________________________________
    function enregistrerDonneesDansJSON(data) {
        fetch('./php/sauvegarder_donnees_json.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (response) { return response.text().then(function (text) { return ({ status: response.status, text: text }); }); })
            .then(function (_a) {
            var status = _a.status, text = _a.text;
            try {
                var body = JSON.parse(text);
                if (status === 200) {
                    console.log('Données sauvegardées avec succès');
                }
                else {
                    console.error("\u00C9chec de la sauvegarde des donn\u00E9es : ".concat(body.message));
                }
            }
            catch (error) {
                console.error('Erreur lors de la sauvegarde des données :', text);
            }
        })
            .catch(function (error) {
            console.error('Erreur lors de la sauvegarde des données :', error);
        });
    }
    // const itemsPerPage = 1; // Nombre d'éléments par page
    var itemsPerPageStorageKey = 'itemsPerPage';
    var currentPage = 1; // Page actuelle, initialisée à 1
    var itemsPerPage = parseInt(localStorage.getItem(itemsPerPageStorageKey) || '1');
    var pagination = document.getElementById('pagination');
    var cargaisonData = [];
    // Fonction pour mettre à jour le nombre d'éléments par page
    var updateItemsPerPage = function (newItemsPerPage) {
        itemsPerPage = newItemsPerPage;
        localStorage.setItem(itemsPerPageStorageKey, newItemsPerPage.toString());
        updateDisplay();
    };
    // Charger les données depuis le fichier JSON
    var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('./data.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to load data');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    cargaisonData = data.cargaison;
                    updateDisplay();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error loading data:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Afficher les éléments de la page spécifiée
    var displayItems = function () {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var currentItems = cargaisonData.slice(startIndex, endIndex);
        cargoList.innerHTML = ''; // Réinitialiser la liste
        currentItems.forEach(function (cargo) {
            var cargoRow = document.createElement('tr');
            cargoRow.innerHTML = "\n      <td class=\"w-1/11 py-3 px-4\"><input type=\"checkbox\" onclick=\"redirectTocargaison('".concat(cargo.id, "')\"></td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.id, "</td>\n      <td class=\"w-1/11 py-3 px-4 type\">").concat(cargo.type, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.lieu_depart, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.lieu_arriver, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.date_depart, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.date_arriver, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.Nombre_produits || '', "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(cargo.distance, "</td>\n      <td class=\"w-2/11 py-2 px-3 bg-gray-100 text-gray-700  status \">").concat(cargo.status, "</td>\n      <td class=\"w-2/11 py-2 px-3 bg-gray-100 text-gray-700  etat \">").concat(cargo.etat, "</td>\n      <td class=\"w-2/11 py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  \">Modifier</td>\n      <td class=\"w-2/11 py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  \">Details</td>\n      ");
            cargoList.appendChild(cargoRow);
        });
    };
    // Mettre à jour l'affichage en fonction de la page actuelle
    var updateDisplay = function () {
        displayItems();
        renderPagination();
    };
    // Afficher les boutons de pagination
    var renderPagination = function () {
        pagination.innerHTML = ''; // Réinitialiser la pagination
        var numPages = Math.ceil(cargaisonData.length / itemsPerPage);
        var _loop_1 = function (i) {
            var pageButton = document.createElement('button');
            pageButton.textContent = i.toString();
            pageButton.classList.add('px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded');
            if (i === currentPage) {
                pageButton.classList.add('bg-blue-700');
            }
            pageButton.addEventListener('click', function () {
                currentPage = i;
                updateDisplay();
            });
            pagination.appendChild(pageButton);
        };
        for (var i = 1; i <= numPages; i++) {
            _loop_1(i);
        }
    };
    // Charger les données et afficher la première page au chargement de la page
    loadData();
});
export {};
