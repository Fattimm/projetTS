<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gestion cargaison</title>
    <link href="../dist/output.css" rel="stylesheet">
    <link rel="icon" href="/path/to/your/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <!-- Sidebar -->
    <div class="flex h-screen bg-gray-200">
        <div class="flex flex-col w-64 bg-white border-r h-full">
            <div class="flex items-center justify-center h-16 bg-gray-800 text-white text-2xl font-bold">
                Menu
            </div>
            <div class="flex flex-col flex-grow p-4">
                <nav class="flex-1 px-2 space-y-2">
                    <a href="cargaison.html" class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-900">
                        <span class="mx-4 font-medium">Cargaison</span>
                    </a>
                    <a href="produits.html" class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-900">
                        <span class="mx-4 font-medium">Produits</span>
                    </a>
                </nav>
            </div>
        </div>
        <div class="flex flex-col flex-grow h-full">
            <nav class="bg-gray-800 p-4 h-16 flex items-center w-full">
                <div class="container mx-auto flex justify-between items-center">
                    <div class="text-white font-bold text-2xl">Gestion de Cargaison</div>
                    <input type="text" id="searchInput" placeholder="Search for cargaison" class="w-1/3 p-2 border rounded">
                    <input type="date" id="dateInput" class="w-1/6 p-2 border rounded mx-2">
                    <button id="popupButtonproduit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter
                        produits</button>
                    <div class="px-3 py-3 rounded-full bg-gray-300">
                        <img src="" alt="" class="h-10 w-10 rounded-full">
                    </div>
                </div>
            </nav>
            <div class="flex flex-col flex-grow p-4">
                <main class="container mx-auto p-6 mt-4">
                    <h1 class="text-3xl font-bold mb-4">Détails de la Cargaison</h1>
                    <h2 class="text-xl font-bold mb-4">Liste des Produits</h2>
                    <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
                        <table class="min-w-full bg-white">
                            <thead class="bg-gray-300 text-white">
                                <tr>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Nom</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Type</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Poids (kg)</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Quantité</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Prix (cfa)</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Poids Total (kg)</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Détails</th>
                                    <th class="w-1/8 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody id="productList" class="bg-white divide-y divide-gray-200">
                                <!-- Les lignes de produits seront insérées ici dynamiquement -->
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    </div>

    <!-- POPUP AJOUT PRODUITS -->
    <div id="addProductPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white p-6 rounded shadow-md w-2/3">
            <h2 class="text-xl font-bold mb-4">Ajouter un Produit</h2>
            <form id="addProductForm" method="post">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Nom du Produit</label>
                    <input type="text" id="productName" name="productName"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nom du Produit">
                        <div id="productNameError" class="text-red-500 text-sm mt-1"></div>

                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="productType">Type</label>
                    <select id="productType" name="productType"
                            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            <option value="Alimentaire">Alimentaire</option>
                            <option value="Matériels">Materiels</option>
                            <option value="Chimique">Chimique</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">Quantité</label>
                    <input type="number" id="quantity" name="quantity"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Quantité">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="weight">Poids (kg)</label>
                    <input type="number" id="weight" name="weight"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Poids en kilogrammes">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Prix (cfa)</label>
                    <input type="number" id="price" name="price"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Prix en cfa">
                </div>
                <div class="mb-4 grid grid-cols-2 gap-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="nomExpediteur">Expediteur</label>
                        <input type="text" id="nomExpediteur" name="nomExpediteur"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nom Expediteur">
                            <div id="nomExpediteurError" class="text-red-500 text-sm mt-1"></div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="nomExpediteur">Numéro Expediteur</label>
                        <input type="text" id="telExpediteur" name="telExpediteur"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Tel Expediteur">
                            <div id="telExpediteurError" class="text-red-500 text-sm mt-1"></div>
                    </div> 
                </div>
                <div class="mb-4 grid grid-cols-2 gap-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="nomDestinataire">Destinataire</label>
                        <input type="text" id="nomDestinataire" name="nomDestinataire"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nom Destinataire">
                            <div id="nomDestinataireError" class="text-red-500 text-sm mt-1"></div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="telDestinataire">Numéro Expediteur</label>
                        <input type="text" id="telDestinataire" name="telDestinataire"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Tel Destinataire">
                            <div id="telDestinataireError" class="text-red-500 text-sm mt-1"></div>
                    </div> 
                </div>
                
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Ajouter Produit
                    </button>
                    <button id="closePopupButton" type="button"
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script type="module" src="../dist/cargo.js"></script>
</body>

</html>
