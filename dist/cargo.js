"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments du DOM
    var popupButtonproduit = document.getElementById('popupButtonproduit');
    var addProductPopup = document.getElementById('addProductPopup');
    var closePopupButton = document.getElementById('closePopupButton');
    var addProductForm = document.getElementById('addProductForm');
    var productList = document.getElementById('productList');
    var nomExpediteurError = document.getElementById('nomExpediteurError');
    var telExpediteurError = document.getElementById('telExpediteurError');
    var nomDestinataireError = document.getElementById('nomDestinataireError');
    var telDestinataireError = document.getElementById('telDestinataireError');
    var productNameError = document.getElementById('productNameError');
    // Afficher le popup
    popupButtonproduit === null || popupButtonproduit === void 0 ? void 0 : popupButtonproduit.addEventListener('click', function () {
        addProductPopup === null || addProductPopup === void 0 ? void 0 : addProductPopup.classList.remove('hidden');
    });
    // Fermer le popup
    closePopupButton === null || closePopupButton === void 0 ? void 0 : closePopupButton.addEventListener('click', function () {
        addProductPopup === null || addProductPopup === void 0 ? void 0 : addProductPopup.classList.add('hidden');
    });
    // Fonction de validation des noms
    var validateName = function (name) {
        var nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        return nameRegex.test(name);
    };
    // Fonction de validation des numéros de téléphone
    var validatePhoneNumber = function (phoneNumber) {
        var phoneRegex = /^\+?[0-9\s\-]+$/;
        return phoneRegex.test(phoneNumber);
    };
    // Gestion de la soumission du formulaire
    addProductForm === null || addProductForm === void 0 ? void 0 : addProductForm.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        // Récupérer les valeurs des champs
        var productName = document.getElementById('productName').value;
        var productType = document.getElementById('productType').value;
        var quantity = document.getElementById('quantity').value;
        var weight = document.getElementById('weight').value;
        var price = document.getElementById('price').value;
        var nomExpediteur = document.getElementById('nomExpediteur').value;
        var telExpediteur = document.getElementById('telExpediteur').value;
        var nomDestinataire = document.getElementById('nomDestinataire').value;
        var telDestinataire = document.getElementById('telDestinataire').value;
        // Réinitialiser les messages d'erreur
        nomExpediteurError.textContent = '';
        telExpediteurError.textContent = '';
        nomDestinataireError.textContent = '';
        telDestinataireError.textContent = '';
        var isValid = true;
        // Valider le nom de l'expéditeur
        if (!validateName(productName)) {
            productNameError.textContent = 'Nom du produit invalide ou vide';
            isValid = false;
        }
        // Valider le nom de l'expéditeur
        if (!validateName(nomExpediteur)) {
            nomExpediteurError.textContent = 'Nom de l\'expéditeur invalide ou vide';
            isValid = false;
        }
        // Valider le téléphone de l'expéditeur
        if (!validatePhoneNumber(telExpediteur)) {
            telExpediteurError.textContent = 'Numéro de téléphone de l\'expéditeur invalide ou vide';
            isValid = false;
        }
        // Valider le nom du destinataire
        if (!validateName(nomDestinataire)) {
            nomDestinataireError.textContent = 'Nom du destinataire invalide ou vide';
            isValid = false;
        }
        // Valider le téléphone du destinataire
        if (!validatePhoneNumber(telDestinataire)) {
            telDestinataireError.textContent = 'Numéro de téléphone du destinataire invalide ou vide';
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        // Calculer le poids total
        var totalWeight = parseFloat(weight) * parseInt(quantity);
        // Créer une nouvelle ligne de produit
        var newRow = document.createElement('tr');
        newRow.innerHTML = "\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">".concat(productName, "</td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(productType, "</td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(weight, "</td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(quantity, "</td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(price, "</td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(totalWeight, "</td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">\n                <button class=\"details-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded\">Details</button>\n            </td>\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">\n                <button class=\"delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded\">Supprimer</button>\n            </td>\n        ");
        // Ajouter la nouvelle ligne au tableau
        (_a = productList.querySelector('tbody')) === null || _a === void 0 ? void 0 : _a.appendChild(newRow);
        // Réinitialiser le formulaire et masquer le popup
        addProductForm.reset();
        addProductPopup.classList.add('hidden');
    });
    // Gestion de la suppression d'un produit
    productList === null || productList === void 0 ? void 0 : productList.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('delete-btn')) {
            var row = target.closest('tr');
            row === null || row === void 0 ? void 0 : row.remove();
        }
    });
});
//# sourceMappingURL=cargo.js.map