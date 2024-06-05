/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");

// import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';
document.addEventListener('DOMContentLoaded', function () {
    var popupButton = document.getElementById('popupButton');
    var addCargoPopup = document.getElementById('ajoutcargo');
    var annulerButton = document.querySelector('#ajoutcargo button[type="button"]');
    var ajouterButton = document.querySelector('#ajoutcargo button[type="submit"]');
    var formulaireAjoutCargaison = document.getElementById('formulaireAjoutCargaison');
    var cargoList = document.getElementById('cargoList');
    var dateDepartError = document.getElementById('dateDepartError');
    var dateArriveeError = document.getElementById('dateArriveeError');
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
        var distance = document.getElementById('distance').value;
        var donneesFormulaire = recupererDonneesFormulaire();
        donneesFormulaire.status = 'Ouvert';
        donneesFormulaire.etat = 'Attente';
        enregistrerDonneesDansJSON(donneesFormulaire);
        // Vérifier si les dates sont valides
        if (!validateDates(dateDepart, dateArrivee)) {
            return;
        }
        var row = document.createElement('tr');
        row.innerHTML = "\n      <td class=\"w-1/11 py-3 px-4\"><input type=\"checkbox\" onclick=\"redirectTocargaison('".concat(donneesFormulaire.id, "')\"></td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.id, "</td>\n      <td class=\"w-1/11 py-3 px-4 type\">").concat(donneesFormulaire.type, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.lieu_depart, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.lieu_arriver, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.date_depart, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.date_arriver, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.Nombre_produits, "</td>\n      <td class=\"w-1/11 py-3 px-4\">").concat(donneesFormulaire.distance, "</td>\n      <td class=\"w-2/11 py-3 px-4 status \">\n          <span class=\"status bg-gray-300 text-gray-700 px-2 py-2 rounded mr-4\">").concat(donneesFormulaire.status, "</span>\n          <button class=\"close-status-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded\">\n               Fermer\n          </button>\n      </td>\n      <td class=\"w-2/11 py-3 px-4 etat \">\n          <span class=\"etat bg-gray-300 text-gray-700 px-2 py-2 rounded mr-4\">").concat(donneesFormulaire.etat, "</span>\n          <select class=\"close-etat-select bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded\">\n              <option value=\"en cours\" ").concat(donneesFormulaire.etat === 'en cours' ? 'selected' : '', ">en cours</option>\n              <option value=\"termin\u00E9\" ").concat(donneesFormulaire.etat === 'terminé' ? 'selected' : '', ">termin\u00E9</option>\n          </select>\n      </td>\n  \n\n  ");
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
                row.innerHTML = "\n                  <td class=\"w-1/11 py-3 px-4\"><input type=\"checkbox\" onclick=\"redirectTocargaison('".concat(cargaison.id, "')\"></td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.id, "</td>\n                  <td class=\"w-1/11 py-3 px-4 type\">").concat(cargaison.type, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.lieu_depart, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.lieu_arriver, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.date_depart, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.date_arriver, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.Nombre_produits, "</td>\n                  <td class=\"w-1/11 py-3 px-4\">").concat(cargaison.distance, "</td>\n                  <td class=\"w-2/11 py-3 px-4 status \"> \n                      <span class=\"status bg-gray-300 text-gray-700 px-2 py-2 rounded mr-4\">").concat(cargaison.status, "</span>\n                      <button class=\"close-status-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded\">\n                          Fermer\n                      </button>\n                  </td>\n                  <td class=\"w-2/11 py-3 px-4 etat \">\n                      <span class=\"status bg-gray-300 text-gray-700 px-2 py-2 rounded mr-4\">").concat(cargaison.etat, "</span>\n                      <select class=\"close-etat-select bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded\">\n                          <option value=\"en cours\" ").concat(cargaison.etat === 'en cours' ? 'selected' : '', ">en cours</option>\n                          <option value=\"termin\u00E9\" ").concat(cargaison.etat === 'terminé' ? 'selected' : '', ">termin\u00E9</option>\n                      </select>\n                  </td>\n              ");
                cargoList.appendChild(row); // Ajoute la nouvelle ligne au tableau
            });
        })
            .catch(function (error) {
            console.error('Erreur lors du chargement des données JSON :', error);
        });
    }
    window.addEventListener('load', chargerDonneesJSON);
    // let currentId = 1;
    //FONCTION POUR RÉCUPÉRER LES DONNÉES DU FORMULAIE _______________________________________________________________
    function recupererDonneesFormulaire() {
        var formData = new FormData(formulaireAjoutCargaison);
        // const id = currentId.toString();
        // currentId++; 
        var nombreProduits = formData.get('Nombre_produits');
        var lieuDepart = document.getElementById('lieuDepart').value;
        var lieuArrivee = document.getElementById('lieuArrivee').value;
        var dateDepart = document.getElementById('dateDepart').value;
        var dateArrivee = document.getElementById('dateArrivee').value;
        var distance = document.getElementById('distance').value;
        var id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Génération d'un UUID unique
        console.log(id);
        return {
            id: id,
            type: formData.get('typeCargaison'),
            lieu_depart: lieuDepart,
            lieu_arriver: lieuArrivee,
            date_depart: dateDepart,
            date_arriver: dateArrivee,
            Nombre_produits: nombreProduits,
            distance: formData.get('distance'),
            status: formData.get('status'),
            etat: formData.get('etat')
        };
    }
    // POUR METTRE A JOUR LE STATUS
    function mettreAJourStatutDansJSONEtAffichage(cargaison, nouveauStatut) {
        cargaison.status = nouveauStatut;
        enregistrerDonneesDansJSON(cargaison); // Met à jour le statut dans le JSON
        var statusSpan = document.querySelector("tr[id=\"".concat(cargaison.id, "\"] .status"));
        statusSpan.textContent = nouveauStatut; // Met à jour le statut dans l'affichage
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
    //PAGINATION______________________________________________________________________________
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxRQUFFLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxFQUFqRSxDQUFpRSxDQUFDO2FBQ25GLElBQUksQ0FBQyxVQUFDLEVBQWdCO2dCQUFkLE1BQU0sY0FBRSxJQUFJO1lBQ2pCLElBQUksQ0FBQztnQkFDRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyx5REFBd0MsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUM7Z0JBQzFFLENBQUM7WUFDTCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsZUFBSztZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsMEZBQTBGO0FBTTFGLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhlbXBsZXRzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vZXhlbXBsZXRzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9leGVtcGxldHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9leGVtcGxldHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9leGVtcGxldHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL2V4ZW1wbGV0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vZXhlbXBsZXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4ZW1wbGV0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhlbXBsZXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhlbXBsZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhlbXBsZXRzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuLy8gaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAnLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL2luZGV4LmpzJztcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuY29uc3QgcG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBCdXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbmNvbnN0IGFkZENhcmdvUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWpvdXRjYXJnbycpIGFzIEhUTUxEaXZFbGVtZW50O1xuY29uc3QgYW5udWxlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNham91dGNhcmdvIGJ1dHRvblt0eXBlPVwiYnV0dG9uXCJdJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5jb25zdCBham91dGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fqb3V0Y2FyZ28gYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbmNvbnN0IGZvcm11bGFpcmVBam91dENhcmdhaXNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtdWxhaXJlQWpvdXRDYXJnYWlzb24nKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XG5jb25zdCBjYXJnb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZ29MaXN0JykgYXMgSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQ7XG5jb25zdCBkYXRlRGVwYXJ0RXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZURlcGFydEVycm9yJykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG5jb25zdCBkYXRlQXJyaXZlZUVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVBcnJpdmVlRXJyb3InKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcblxuXG5jb25zdCB0b2dnbGVQb3B1cCA9IChzaG93OiBib29sZWFuKSA9PiB7XG4gIGlmIChhZGRDYXJnb1BvcHVwKSB7XG4gICAgYWRkQ2FyZ29Qb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nLCAhc2hvdyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdvdmVyZmxvdy1oaWRkZW4nLCBzaG93KTtcbiAgfVxufTtcbnBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlUG9wdXAodHJ1ZSkpO1xuYW5udWxlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZVBvcHVwKGZhbHNlKSk7XG5cblxuIC8vIEZPTkNUSU9OIFBPVVIgVkFMSURFUiBEQVRFU1xuICBjb25zdCB2YWxpZGF0ZURhdGVzID0gKGRhdGVEZXBhcnQ6IHN0cmluZywgZGF0ZUFycml2ZWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkuc2V0SG91cnMoMCwgMCwgMCwgMCk7IC8vIERhdGUgZCdhdWpvdXJkJ2h1aSDDoCBtaW51aXRcbiAgICBjb25zdCBkZXBhcnQgPSBuZXcgRGF0ZShkYXRlRGVwYXJ0KS5zZXRIb3VycygwLCAwLCAwLCAwKTsgLy8gRGF0ZSBkZSBkw6lwYXJ0IMOgIG1pbnVpdFxuICAgIGNvbnN0IGFycml2ZWUgPSBuZXcgRGF0ZShkYXRlQXJyaXZlZSkuc2V0SG91cnMoMCwgMCwgMCwgMCk7IC8vIERhdGUgZCdhcnJpdsOpZSDDoCBtaW51aXRcblxuICAgIGRhdGVEZXBhcnRFcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgIGRhdGVBcnJpdmVlRXJyb3IudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGlmIChkZXBhcnQgPCB0b2RheSkge1xuICAgICAgICBkYXRlRGVwYXJ0RXJyb3IudGV4dENvbnRlbnQgPSAnTGEgZGF0ZSBkZSBkw6lwYXJ0IG5lIHBldXQgcGFzIMOqdHJlIGFudMOpcmlldXJlIMOgIGF1am91cmRcXCdodWkuJztcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGVwYXJ0ID49IGFycml2ZWUpIHtcbiAgICAgICAgZGF0ZUFycml2ZWVFcnJvci50ZXh0Q29udGVudCA9ICdMYSBkYXRlIGRlIGTDqXBhcnQgZG9pdCDDqnRyZSBhbnTDqXJpZXVyZSDDoCBsYSBkYXRlIGRcXCdhcnJpdsOpZS4nO1xuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc1ZhbGlkO1xufTtcblxuXG4vL0FKT1VURVIgQ0FSR0FJU09OIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXG5mb3JtdWxhaXJlQWpvdXRDYXJnYWlzb24uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgZGF0ZURlcGFydCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZURlcGFydCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICBjb25zdCBkYXRlQXJyaXZlZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZUFycml2ZWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgY29uc3QgZGlzdGFuY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3RhbmNlJykgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgY29uc3QgZG9ubmVlc0Zvcm11bGFpcmUgPSByZWN1cGVyZXJEb25uZWVzRm9ybXVsYWlyZSgpO1xuICBkb25uZWVzRm9ybXVsYWlyZS5zdGF0dXMgPSAnT3V2ZXJ0JztcbiAgZG9ubmVlc0Zvcm11bGFpcmUuZXRhdCA9ICdBdHRlbnRlJztcblxuICBlbnJlZ2lzdHJlckRvbm5lZXNEYW5zSlNPTihkb25uZWVzRm9ybXVsYWlyZSk7XG5cblxuICAvLyBWw6lyaWZpZXIgc2kgbGVzIGRhdGVzIHNvbnQgdmFsaWRlc1xuICAgIGlmICghdmFsaWRhdGVEYXRlcyhkYXRlRGVwYXJ0LCBkYXRlQXJyaXZlZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgcm93LmlubmVySFRNTCA9IGBcbiAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jbGljaz1cInJlZGlyZWN0VG9jYXJnYWlzb24oJyR7ZG9ubmVlc0Zvcm11bGFpcmUuaWR9JylcIj48L3RkPlxuICAgICAgPHRkIGNsYXNzPVwidy0xLzExIHB5LTMgcHgtNFwiPiR7ZG9ubmVlc0Zvcm11bGFpcmUuaWR9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTQgdHlwZVwiPiR7ZG9ubmVlc0Zvcm11bGFpcmUudHlwZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwidy0xLzExIHB5LTMgcHgtNFwiPiR7ZG9ubmVlc0Zvcm11bGFpcmUubGlldV9kZXBhcnR9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj4ke2Rvbm5lZXNGb3JtdWxhaXJlLmxpZXVfYXJyaXZlcn08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwidy0xLzExIHB5LTMgcHgtNFwiPiR7ZG9ubmVlc0Zvcm11bGFpcmUuZGF0ZV9kZXBhcnR9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj4ke2Rvbm5lZXNGb3JtdWxhaXJlLmRhdGVfYXJyaXZlcn08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwidy0xLzExIHB5LTMgcHgtNFwiPiR7ZG9ubmVlc0Zvcm11bGFpcmUuTm9tYnJlX3Byb2R1aXRzfTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJ3LTEvMTEgcHktMyBweC00XCI+JHtkb25uZWVzRm9ybXVsYWlyZS5kaXN0YW5jZX08L3RkPlxuICAgICAgPHRkIGNsYXNzPVwidy0yLzExIHB5LTMgcHgtNCBzdGF0dXMgXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGF0dXMgYmctZ3JheS0zMDAgdGV4dC1ncmF5LTcwMCBweC0yIHB5LTIgcm91bmRlZCBtci00XCI+JHtkb25uZWVzRm9ybXVsYWlyZS5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZS1zdGF0dXMtYnV0dG9uIGJnLWJsdWUtNTAwIGhvdmVyOmJnLWJsdWUtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtMiByb3VuZGVkXCI+XG4gICAgICAgICAgICAgICBGZXJtZXJcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJ3LTIvMTEgcHktMyBweC00IGV0YXQgXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJldGF0IGJnLWdyYXktMzAwIHRleHQtZ3JheS03MDAgcHgtMiBweS0yIHJvdW5kZWQgbXItNFwiPiR7ZG9ubmVlc0Zvcm11bGFpcmUuZXRhdH08L3NwYW4+XG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImNsb3NlLWV0YXQtc2VsZWN0IGJnLWJsdWUtNTAwIGhvdmVyOmJnLWJsdWUtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtMiByb3VuZGVkXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJlbiBjb3Vyc1wiICR7ZG9ubmVlc0Zvcm11bGFpcmUuZXRhdCA9PT0gJ2VuIGNvdXJzJyA/ICdzZWxlY3RlZCcgOiAnJ30+ZW4gY291cnM8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRlcm1pbsOpXCIgJHtkb25uZWVzRm9ybXVsYWlyZS5ldGF0ID09PSAndGVybWluw6knID8gJ3NlbGVjdGVkJyA6ICcnfT50ZXJtaW7DqTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC90ZD5cbiAgXG5cbiAgYDtcbiAgXG4gIGNhcmdvTGlzdC5hcHBlbmRDaGlsZChyb3cpO1xuICBcbiAgZm9ybXVsYWlyZUFqb3V0Q2FyZ2Fpc29uLnJlc2V0KCk7XG4gIFxuICB0b2dnbGVQb3B1cChmYWxzZSk7IFxuXG59KTtcblxuXG4vL0ZPTkNUSU9OIFBPVVIgQ0hBUkdFUiBMRVMgRE9OTsOJRVMgREFOUyBKU09OIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXG5mdW5jdGlvbiBjaGFyZ2VyRG9ubmVlc0pTT04oKSB7XG4gIGZldGNoKCcuL2RhdGEuanNvbicpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBjYXJnb0xpc3QuaW5uZXJIVE1MID0gJyc7IC8vIEVmZmFjZSBsZSBjb250ZW51IGV4aXN0YW50IGR1IHRhYmxlYXVcblxuICAgICAgICAgIGRhdGEuY2FyZ2Fpc29uLmZvckVhY2goKGNhcmdhaXNvbjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cbiAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jbGljaz1cInJlZGlyZWN0VG9jYXJnYWlzb24oJyR7Y2FyZ2Fpc29uLmlkfScpXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj4ke2NhcmdhaXNvbi5pZH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidy0xLzExIHB5LTMgcHgtNCB0eXBlXCI+JHtjYXJnYWlzb24udHlwZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidy0xLzExIHB5LTMgcHgtNFwiPiR7Y2FyZ2Fpc29uLmxpZXVfZGVwYXJ0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3LTEvMTEgcHktMyBweC00XCI+JHtjYXJnYWlzb24ubGlldV9hcnJpdmVyfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3LTEvMTEgcHktMyBweC00XCI+JHtjYXJnYWlzb24uZGF0ZV9kZXBhcnR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj4ke2NhcmdhaXNvbi5kYXRlX2Fycml2ZXJ9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj4ke2NhcmdhaXNvbi5Ob21icmVfcHJvZHVpdHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInctMS8xMSBweS0zIHB4LTRcIj4ke2NhcmdhaXNvbi5kaXN0YW5jZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidy0yLzExIHB5LTMgcHgtNCBzdGF0dXMgXCI+IFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3RhdHVzIGJnLWdyYXktMzAwIHRleHQtZ3JheS03MDAgcHgtMiBweS0yIHJvdW5kZWQgbXItNFwiPiR7Y2FyZ2Fpc29uLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlLXN0YXR1cy1idXR0b24gYmctYmx1ZS01MDAgaG92ZXI6YmctYmx1ZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcHktMiBweC0yIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgRmVybWVyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidy0yLzExIHB5LTMgcHgtNCBldGF0IFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3RhdHVzIGJnLWdyYXktMzAwIHRleHQtZ3JheS03MDAgcHgtMiBweS0yIHJvdW5kZWQgbXItNFwiPiR7Y2FyZ2Fpc29uLmV0YXR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJjbG9zZS1ldGF0LXNlbGVjdCBiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTIgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZW4gY291cnNcIiAke2NhcmdhaXNvbi5ldGF0ID09PSAnZW4gY291cnMnID8gJ3NlbGVjdGVkJyA6ICcnfT5lbiBjb3Vyczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidGVybWluw6lcIiAke2NhcmdhaXNvbi5ldGF0ID09PSAndGVybWluw6knID8gJ3NlbGVjdGVkJyA6ICcnfT50ZXJtaW7DqTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICBjYXJnb0xpc3QuYXBwZW5kQ2hpbGQocm93KTsgLy8gQWpvdXRlIGxhIG5vdXZlbGxlIGxpZ25lIGF1IHRhYmxlYXVcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGVzIGRvbm7DqWVzIEpTT04gOicsIGVycm9yKTtcbiAgICAgIH0pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNoYXJnZXJEb25uZWVzSlNPTik7XG5cblxuLy8gbGV0IGN1cnJlbnRJZCA9IDE7XG4vL0ZPTkNUSU9OIFBPVVIgUsOJQ1VQw4lSRVIgTEVTIERPTk7DiUVTIERVIEZPUk1VTEFJRSBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cbmZ1bmN0aW9uIHJlY3VwZXJlckRvbm5lZXNGb3JtdWxhaXJlKCk6IGFueSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm11bGFpcmVBam91dENhcmdhaXNvbik7XG4gIC8vIGNvbnN0IGlkID0gY3VycmVudElkLnRvU3RyaW5nKCk7XG4gIC8vIGN1cnJlbnRJZCsrOyBcbiAgY29uc3Qgbm9tYnJlUHJvZHVpdHMgPSBmb3JtRGF0YS5nZXQoJ05vbWJyZV9wcm9kdWl0cycpIGFzIHN0cmluZztcbiAgY29uc3QgbGlldURlcGFydCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlldURlcGFydCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlOyBcbiAgY29uc3QgbGlldUFycml2ZWUgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZXVBcnJpdmVlJykgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gIGNvbnN0IGRhdGVEZXBhcnQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVEZXBhcnQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTsgXG4gIGNvbnN0IGRhdGVBcnJpdmVlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlQXJyaXZlZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICBjb25zdCBkaXN0YW5jZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzdGFuY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgY29uc3QgaWQgPSB1dWlkdjQoKTsgLy8gR8OpbsOpcmF0aW9uIGQndW4gVVVJRCB1bmlxdWVcbiAgY29uc29sZS5sb2coaWQpO1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IGlkLFxuICAgIHR5cGU6IGZvcm1EYXRhLmdldCgndHlwZUNhcmdhaXNvbicpIGFzIHN0cmluZyxcbiAgICBsaWV1X2RlcGFydDogbGlldURlcGFydCxcbiAgICBsaWV1X2Fycml2ZXI6IGxpZXVBcnJpdmVlLFxuICAgIGRhdGVfZGVwYXJ0OiBkYXRlRGVwYXJ0LFxuICAgIGRhdGVfYXJyaXZlcjogZGF0ZUFycml2ZWUsXG4gICAgTm9tYnJlX3Byb2R1aXRzOiBub21icmVQcm9kdWl0cyxcbiAgICBkaXN0YW5jZTogZm9ybURhdGEuZ2V0KCdkaXN0YW5jZScpIGFzIHN0cmluZyxcbiAgICBzdGF0dXM6IGZvcm1EYXRhLmdldCgnc3RhdHVzJykgYXMgc3RyaW5nLFxuICAgIGV0YXQ6IGZvcm1EYXRhLmdldCgnZXRhdCcpIGFzIHN0cmluZ1xuICB9O1xufVxuLy8gUE9VUiBNRVRUUkUgQSBKT1VSIExFIFNUQVRVU1xuZnVuY3Rpb24gbWV0dHJlQUpvdXJTdGF0dXREYW5zSlNPTkV0QWZmaWNoYWdlKGNhcmdhaXNvbjogYW55LCBub3V2ZWF1U3RhdHV0OiBzdHJpbmcpIHtcbiAgY2FyZ2Fpc29uLnN0YXR1cyA9IG5vdXZlYXVTdGF0dXQ7XG4gIGVucmVnaXN0cmVyRG9ubmVlc0RhbnNKU09OKGNhcmdhaXNvbik7IC8vIE1ldCDDoCBqb3VyIGxlIHN0YXR1dCBkYW5zIGxlIEpTT05cbiAgY29uc3Qgc3RhdHVzU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHRyW2lkPVwiJHtjYXJnYWlzb24uaWR9XCJdIC5zdGF0dXNgKSBhcyBIVE1MRWxlbWVudDtcbiAgc3RhdHVzU3Bhbi50ZXh0Q29udGVudCA9IG5vdXZlYXVTdGF0dXQ7IC8vIE1ldCDDoCBqb3VyIGxlIHN0YXR1dCBkYW5zIGwnYWZmaWNoYWdlXG59XG5cblxuLy9GT05DVElPTiBQT1VSIEVOUkVHSVNUUkVSIExFUyBET05Ow4lFUyBEQU5TIEpTT04gX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1xuZnVuY3Rpb24gZW5yZWdpc3RyZXJEb25uZWVzRGFuc0pTT04oZGF0YTogYW55KSB7XG4gIGZldGNoKCcuL3BocC9zYXV2ZWdhcmRlcl9kb25uZWVzX2pzb24ucGhwJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gIH0pXG4gIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKS50aGVuKHRleHQgPT4gKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsIHRleHQgfSkpKVxuICAudGhlbigoeyBzdGF0dXMsIHRleHQgfSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rvbm7DqWVzIHNhdXZlZ2FyZMOpZXMgYXZlYyBzdWNjw6hzJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgw4ljaGVjIGRlIGxhIHNhdXZlZ2FyZGUgZGVzIGRvbm7DqWVzIDogJHtib2R5Lm1lc3NhZ2V9YCk7XG4gICAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlIGRlcyBkb25uw6llcyA6JywgdGV4dCk7XG4gICAgICB9XG4gIH0pXG4gIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlIGRlcyBkb25uw6llcyA6JywgZXJyb3IpO1xuICB9KTtcbn1cblxuXG4vL1BBR0lOQVRJT05fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cblxuXG5cblxuXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==