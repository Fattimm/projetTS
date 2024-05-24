<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Détails de la Cargaison</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="text-white font-bold text-xl">Détails de la Cargaison</div>
        <div class="text-gray-400">Bienvenue, Utilisateur</div>
      </div>
    </div>
  </nav>

  <main class="container mx-auto p-6 mt-4">
    <h1 class="text-3xl font-bold mb-4">Détails de la Cargaison</h1>
    <div class="grid grid-cols-4 gap-4">
      <!-- Formulaire pour ajouter un produit -->
      <div class="col-span-1 bg-white shadow-md rounded p-6">
        <h2 class="text-xl font-bold mb-4">Ajouter un Produit</h2>
        <form id="addProductForm">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Nom du Produit</label>
            <input type="text" id="productName" name="productName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nom du Produit">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">Quantité</label>
            <input type="number" id="quantity" name="quantity" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Quantité">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="weight">Poids (kg)</label>
            <input type="number" id="weight" name="weight" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Poids en kilogrammes">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Ajouter Produit
            </button>
          </div>
        </form>
      </div>

      <!-- Tableau pour afficher les produits -->
      <div class="col-span-3 bg-white shadow-md rounded p-6">
        <h2 class="text-xl font-bold mb-4">Liste des Produits</h2>
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
              <th class="px-4 py-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantité</th>
              <th class="px-4 py-2 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Poids (kg)</th>
            </tr>
          </thead>
          <tbody id="productList" class="bg-white divide-y divide-gray-200">
            <!-- Les détails des produits seront ajoutés ici -->
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <script>
    document.getElementById('addProductForm').addEventListener('submit', function(event) {
      event.preventDefault();
      var productName = document.getElementById('productName').value;
      var quantity = document.getElementById('quantity').value;
      var weight = document.getElementById('weight').value;

      // Création d'une nouvelle ligne dans le tableau pour afficher les détails du produit
      var row = document.createElement('tr');
      var nameCell = document.createElement('td');
      var quantityCell = document.createElement('td');
      var weightCell = document.createElement('td');

      nameCell.textContent = productName;
      quantityCell.textContent = quantity;
      weightCell.textContent = weight;

      row.appendChild(nameCell);
      row.appendChild(quantityCell);
      row.appendChild(weightCell);

      document.getElementById('productList').appendChild(row);
      // Effacer les champs du formulaire après l'ajout
      document.getElementById('productName').value = '';
      document.getElementById('quantity').value = '';
      document.getElementById('weight').value = '';
    });
  </script>

</body>
</html>
