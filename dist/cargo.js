"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var popupButtonproduit = document.getElementById('popupButtonproduit');
    var addProductPopup = document.getElementById('addProductPopup');
    var closePopupButton = document.getElementById('closePopupButton');
    var addProductForm = document.getElementById('addProductForm');
    var productList = document.getElementById('productList'); // Correction du type HTMLTableElement
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
    // Récupérer l'ID de la cargaison depuis l'URL
    var getCargaisonIdFromURL = function () {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    };
    addProductForm === null || addProductForm === void 0 ? void 0 : addProductForm.addEventListener('submit', function (e) {
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
        productNameError.textContent = '';
        nomExpediteurError.textContent = '';
        telExpediteurError.textContent = '';
        nomDestinataireError.textContent = '';
        telDestinataireError.textContent = '';
        var isValid = true;
        // Valider les champs
        if (!validateName(productName)) {
            productNameError.textContent = 'Nom du produit invalide ou vide';
            isValid = false;
        }
        if (!validateName(nomExpediteur)) {
            nomExpediteurError.textContent = 'Nom de l\'expéditeur invalide ou vide';
            isValid = false;
        }
        if (!validatePhoneNumber(telExpediteur)) {
            telExpediteurError.textContent = 'Numéro de téléphone de l\'expéditeur invalide ou vide';
            isValid = false;
        }
        if (!validateName(nomDestinataire)) {
            nomDestinataireError.textContent = 'Nom du destinataire invalide ou vide';
            isValid = false;
        }
        if (!validatePhoneNumber(telDestinataire)) {
            telDestinataireError.textContent = 'Numéro de téléphone du destinataire invalide ou vide';
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        // Calculer le poids total
        var totalWeight = parseFloat(weight) * parseInt(quantity);
        // Récupérer l'ID de la cargaison
        var cargaisonId = getCargaisonIdFromURL();
        if (!cargaisonId) {
            console.error('ID de cargaison non trouvé');
            return;
        }
        var newProduct = {
            "cargaisonId": cargaisonId,
            productName: productName,
            productType: productType,
            quantity: quantity,
            weight: weight,
            price: price,
            nomExpediteur: nomExpediteur,
            telExpediteur: telExpediteur,
            nomDestinataire: nomDestinataire,
            telDestinataire: telDestinataire
        };
        // Envoyer les détails du produit au serveur
        fetch('../php/sauvegarder_donnees_json.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            console.log('Success:', data);
            // Créer une nouvelle ligne de produit avec les données renvoyées par le serveur
            var newProduct = data.produit; // Assurez-vous que le serveur renvoie les données du produit correctement
            var totalWeight = parseFloat(newProduct.weight) * parseInt(newProduct.quantity);
            // Créer une nouvelle ligne de produit avec les détails du produit ajouté
            var newRow = document.createElement('tr');
            newRow.innerHTML = "\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">".concat(newProduct.productName, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.productType, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.weight, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.quantity, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.price, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(totalWeight, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\"><button class=\"details-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded\">Details</button></td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\"><button class=\"delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded\">Supprimer</button></td>\n            ");
            productList === null || productList === void 0 ? void 0 : productList.appendChild(newRow);
            // Réinitialiser le formulaire et masquer le popup
            addProductForm.reset();
            addProductPopup === null || addProductPopup === void 0 ? void 0 : addProductPopup.classList.add('hidden');
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
        // Afficher les éléments de la page spécifiée
        var produitRow = document.createElement('tr');
        produitRow.innerHTML = "\n            <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">".concat(newProduct.productName, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.productType, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.weight, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.quantity, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(newProduct.price, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\">").concat(totalWeight, "</td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\"><button class=\"details-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded\">Details</button></td>\n                <td class=\"w-1/8 py-3 px-4 text-gray-600 text-left\"><button class=\"delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded\">Supprimer</button></td>\n            ");
        productList.appendChild(produitRow);
    });
    productList === null || productList === void 0 ? void 0 : productList.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('delete-btn')) {
            var row = target.closest('tr');
            row === null || row === void 0 ? void 0 : row.remove();
        }
    });
});
//# sourceMappingURL=cargo.js.map