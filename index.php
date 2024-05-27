<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./dist/output.css" rel="stylesheet">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <div>
      <nav class="bg-gray-800 p-8">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-white font-bold text-xl">Gestion de Cargaison</div>
          <button id="popupButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter cargaison</button>
        </div>
      </nav>

    <div>
    <main class="container mx-auto p-6 mt-4">
        <h1 class="text-3xl font-bold mb-4">Liste des Cargaisons</h1>
        <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Sélectionner</th>
                <th class="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">ID</th>
                <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Type</th>
                <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Lieu de départ</th>
                <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Lieu d'arrivée</th>
                <th class="w-1/4 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Nombre de produits Maximum</th>
                <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Statut</th>
                <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">État</th>
              </tr>
            </thead>
            <tbody id="cargoList" class="text-gray-700">
              <!-- Rows will be inserted here dynamically -->
            </tbody>
          </table>
        </div>
      </main>
    </div>

     <!-- Popup d'ajout -->
    <div id="ajoutcargo" class="container mx-auto px-4 fixed inset-x-0 inset-y-8 hidden w-2/3">
    <form method="post" id="formulaireAjoutCargaison" class="bg-white shadow rounded-lg px-8 pb-4"> <h1 class="text-2xl font-bold mb-4">Formulaire d'ajout de nouvelle cargaison</h1>
      <div class="mb-4">
        <label for="typeCargaison" class="block text-gray-700 mb-2">Type de cargaison:</label>
        <select id="typeCargaison" name="typeCargaison"
            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required>
          <option value="maritime">Maritime</option>
          <option value="aerien">Aérien</option>
          <option value="terrestre">Terrestre</option>
        </select>
      </div>
      <div id="map" class="h-48 mb-4"> </div>
      <!-- <input type="hidden" id="marker1Lat" name="marker1Lat">
      <input type="hidden" id="marker1Lng" name="marker1Lng">
      <input type="hidden" id="marker2Lat" name="marker2Lng">
      <input type="hidden" id="marker2Lng" name="marker2Lng"> -->
      <div class="mb-4">
        <label for="lieuDepart" class="block text-gray-700 mb-2">Lieu de départ:</label>
        <input type="text" id="lieuDepart" name="lieuDepart"
            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required >
      </div>
      <div class="mb-4">
        <label for="lieuArrivee" class="block text-gray-700 mb-2">Lieu d'arrivée:</label>
        <input type="text" id="lieuArrivee" name="lieuArrivee"
            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required>
      </div>
      <div class="mb-4">
        <label for="Nombre_produits" class="block text-gray-700 mb-2">Nombre de produits Maximum</label>
        <input type="number" id="Nombre_produits" name="Nombre_produits"
            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required>
      </div>
      <div class="mb-4">
        <label for="status" class="block text-gray-700 mb-2">Status:</label>
        <select id="status" name="status"
            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required>
          <option value="ouvert">Ouvert</option>
          <option value="ferme">Fermé</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="etat" class="block text-gray-700 mb-2">État:</label>
        <select id="etat" name="etat"
            class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required>
          <option value="en_attente">En Attente</option>
          <option value="en_cours">En Cours</option>
          <option value="termine">Terminé</option>
        </select>
      </div>
      <div class="flex justify-end">
                  <button type="button" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4">Annuler</button>
                  <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter</button>
              </div>
    </form>
    </div>

    <!-- <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry&callback=initMap" async defer></script> -->
    <script src="./dist/index.js"></script>
</body>
</html>
