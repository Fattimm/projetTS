document.addEventListener('DOMContentLoaded', () => {
    // Récupération des éléments du DOM
    const popupButtonproduit = document.getElementById('popupButtonproduit') as HTMLButtonElement;
    const addProductPopup = document.getElementById('addProductPopup') as HTMLDivElement;
    const closePopupButton = document.getElementById('closePopupButton') as HTMLButtonElement;
    const addProductForm = document.getElementById('addProductForm') as HTMLFormElement;
    const productList = document.getElementById('productList') as HTMLTableElement;
    const nomExpediteurError = document.getElementById('nomExpediteurError') as HTMLDivElement;
    const telExpediteurError = document.getElementById('telExpediteurError') as HTMLDivElement;
    const nomDestinataireError = document.getElementById('nomDestinataireError') as HTMLDivElement;
    const telDestinataireError = document.getElementById('telDestinataireError') as HTMLDivElement;
    const productNameError = document.getElementById('productNameError') as HTMLDivElement;


    // Afficher le popup
    popupButtonproduit?.addEventListener('click', () => {
        addProductPopup?.classList.remove('hidden');
    });

    // Fermer le popup
    closePopupButton?.addEventListener('click', () => {
        addProductPopup?.classList.add('hidden');
    });

    // Fonction de validation des noms
    const validateName = (name: string): boolean => {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        return nameRegex.test(name);
    };

    // Fonction de validation des numéros de téléphone
    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^\+?[0-9\s\-]+$/;
        return phoneRegex.test(phoneNumber);
    };

    // Gestion de la soumission du formulaire
    addProductForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupérer les valeurs des champs
        const productName = (document.getElementById('productName') as HTMLInputElement).value;
        const productType = (document.getElementById('productType') as HTMLInputElement).value;
        const quantity = (document.getElementById('quantity') as HTMLInputElement).value;
        const weight = (document.getElementById('weight') as HTMLInputElement).value;
        const price = (document.getElementById('price') as HTMLInputElement).value;
        const nomExpediteur = (document.getElementById('nomExpediteur') as HTMLInputElement).value;
        const telExpediteur = (document.getElementById('telExpediteur') as HTMLInputElement).value;
        const nomDestinataire = (document.getElementById('nomDestinataire') as HTMLInputElement).value;
        const telDestinataire = (document.getElementById('telDestinataire') as HTMLInputElement).value;

        // Réinitialiser les messages d'erreur
        nomExpediteurError.textContent = '';
        telExpediteurError.textContent = '';
        nomDestinataireError.textContent = '';
        telDestinataireError.textContent = '';

        let isValid = true;

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
        const totalWeight = parseFloat(weight) * parseInt(quantity);

        // Créer une nouvelle ligne de produit
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">${productName}</td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">${productType}</td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">${weight}</td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">${quantity}</td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">${price}</td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">${totalWeight}</td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">
                <button class="details-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Details</button>
            </td>
            <td class="w-1/8 py-3 px-4 text-gray-600 text-left">
                <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Supprimer</button>
            </td>
        `;

        // Ajouter la nouvelle ligne au tableau
        productList.querySelector('tbody')?.appendChild(newRow);

        // Réinitialiser le formulaire et masquer le popup
        addProductForm.reset();
        addProductPopup.classList.add('hidden');
    });

    // Gestion de la suppression d'un produit
    productList?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains('delete-btn')) {
            const row = target.closest('tr');
            row?.remove();
        }
    });
});