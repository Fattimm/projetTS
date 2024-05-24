<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./dist/output.css" rel="stylesheet">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

  <nav class="bg-gray-800 p-8">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="text-white font-bold text-xl">Gestion de Cargaison</div>
        <div class="text-gray-400">Bienvenue, Utilisateur</div>
      </div>
    </div>
  </nav>
  <main class="container mx-auto p-6 mt-4">
    <h1 class="text-3xl font-bold mb-4">Liste des Cargaisons</h1>
    <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Sélectionner</th>
            <th class="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">ID</th>
            <th class="w-1/4 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Nom</th>
            <th class="w-1/4 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Type</th>
            <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Distance (km)</th>
            <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">Statut</th>
          </tr>
        </thead>
        <tbody id="cargoList" class="text-gray-700">
          <tr>
            <td class="w-1/12 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('001')"></td>
            <td class="w-1/12 py-3 px-4">001</td>
            <td class="w-1/4 py-3 px-4">Électronique</td>
            <td class="w-1/4 py-3 px-4">Maritime</td>
            <td class="w-1/6 py-3 px-4">1000</td>
            <td class="w-1/6 py-3 px-4">En transit</td>
          </tr>
          <tr>
            <td class="w-1/12 py-3 px-4"><input type="checkbox" onclick="redirectTocargaison('002')"></td>
            <td class="w-1/12 py-3 px-4">002</td>
            <td class="w-1/4 py-3 px-4">Alimentaire</td>
            <td class="w-1/4 py-3 px-4">Routiére</td>
            <td class="w-1/6 py-3 px-4">1000</td>
            <td class="w-1/6 py-3 px-4">En transit</td>
          </tr>
          <!-- Ajoutez plus de lignes ici pour d'autres cargaisons -->
        </tbody>
      </table>
    </div>
  </main>

  <script>
    function redirectTocargaison(cargoId) {
      window.location.href = 'cargaison.php?id=' + cargoId;
    }
  </script>

</body>
</html>