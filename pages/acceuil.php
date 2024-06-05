<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gestion cargaison</title>
    <link href="./dist/output.css" rel="stylesheet">
    <link rel="icon" href="/path/to/your/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
                    <button id="popupButton"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter
                        cargaison</button>
                    <div class="px-3 py-3 rounded-full bg-gray-300">
                        <img src="" alt="" class="h-10 w-10 rounded-full">
                    </div>
                </div>
            </nav>
            <div class="flex flex-col flex-grow p-4 ">
                <main class=" container mx-auto p-6 mt-4">
                    <div class=" mx-auto p-3">
                        <h1 class="text-3xl font-bold mb-4">Cargaison</h1>
                        <div class="flex  justify-between mb-4">
                            <div class="bg-white p-4 rounded shadow-md text-center w-1/4">
                                <h2 class="text-xl font-semibold">100</h2>
                                <p class="text-gray-600">Total cargaison</p>
                            </div>
                            <div class="bg-white p-4 rounded shadow-md text-center w-1/4">
                                <h2 class="text-xl font-semibold">90</h2>
                                <p class="text-gray-600">Completed cargaison</p>
                            </div>
                            <div class="bg-white p-4 rounded shadow-md text-center w-1/4">
                                <h2 class="text-xl font-semibold">10</h2>
                                <p class="text-gray-600">Pending cargaison</p>
                            </div>
                        </div>
                    </div>
                    <h1 class="text-3xl font-bold mb-4">Liste des Cargaisons</h1>
                    <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
                        <table class="min-w-full bg-white" id="cargoTable">
                            <thead class="bg-gray-300 text-white">
                                <tr>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Cocher</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">ID
                                    </th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Type</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Lieu départ</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Lieu arrivée</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        date départ</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        date arrivée</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Nombre produits/poids</th>
                                    <th class="w-1/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Distance</th>
                                    <th class="w-2/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Statut</th>
                                    <th class="w-2/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        État</th>
                                    <th class="w-2/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Modifier</th>
                                    <th class="w-2/11 py-3 px-4 uppercase font-semibold text-sm text-gray-600 text-left">
                                        Details</th>
                                </tr>
                            </thead>
                            <tbody id="cargoList" class="text-gray-700">
                                <!-- Rows will be inserted here dynamically -->
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <div class="container mx-auto mt-8">
                <div id="cargoList" class="mb-4"></div>
            
                <div id="pagination" class="flex justify-center space-x-4 mt-4"></div>
            </div>            
        </div>
    </div>


    <!-- POPUP AJOUT ------------------------------------------------------------------------------------->
    <div id="ajoutcargo" class="container mx-auto px-4 fixed inset-x-0 inset-y-8 hidden w-2/3">
        <form method="post" id="formulaireAjoutCargaison" class="bg-white shadow rounded-lg px-8 pb-4">
            <h1 class="text-2xl font-bold mb-4">Formulaire d'ajout de nouvelle cargaison</h1>
            <div class="mb-4">
                <label for="typeCargaison" class="block text-gray-700 mb-2 type">Type de cargaison:</label>
                <select id="typeCargaison" name="typeCargaison"
                    class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="maritime">Maritime</option>
                    <option value="aerien">Aérien</option>
                    <option value="terrestre">Terrestre</option>
                </select>
            </div>
            <div id="map" class="h-64 mb-4">

            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="mb-4">
                    <label for="lieuDepart" class="block text-gray-700 mb-2">Lieu de départ:</label>
                    <input type="text" id="lieuDepart" name="lieuDepart"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="mb-4">
                    <label for="lieuArrivee" class="block text-gray-700 mb-2">Lieu d'arrivée:</label>
                    <input type="text" id="lieuArrivee" name="lieuArrivee"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div class="mb-4">
                <label for="distance" class="block text-gray-700 mb-2">distance en km</label>
                <input type="text" id="distance" name="distance"
                    class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="mb-4">
                    <label for="dateDepart" class="block text-gray-700 mb-2">date de départ:</label>
                    <input type="date" id="dateDepart" name="dateDepart"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <div id="dateDepartError" class="text-red-500 text-sm mt-1"></div>
                </div>
                <div class="mb-4">
                    <label for="dateArrivee" class="block text-gray-700 mb-2">date d'arrivée:</label>
                    <input type="date" id="dateArrivee" name="dateArrivee"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <div id="dateArriveeError" class="text-red-500 text-sm mt-1"></div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="mb-4">
                    <label for="Nombre_produits" class="block text-gray-700 mb-2">Nombre de produits
                        Maximum/Poids</label>
                    <select id="status" name="status"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="poids">Poids</option>
                        <option value="nombre_produits">Nombre de produits Maximum</option>
                    </select>
                </div>

                <div class="mb-4 hidden " id="poidsField">
                    <label for="poids" class="block text-gray-700 mb-2">Poids:</label>
                    <input type="number" id="poids" name="poids"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="mb-4 hidden" id="nombreProduitsField">
                    <label for="nombreProduits" class="block text-gray-700 mb-2">Nombre de produits:</label>
                    <input type="number" id="nombreProduits" name="nombreProduits"
                        class="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

            </div>

            <div class="flex justify-end">
                <button type="button" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4">Annuler</button>
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter</button>
            </div>
        </form>
    </div>

    <!-- POPUP POUR MODIFIER__________________________________________________________ -->
    <div id="modifyCargoPopup" class=" hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <form id="modifyForm">
                <input type="hidden" id="modifyId">
                <div class="mb-4">
                    <label for="modifyType">Type</label>
                    <input type="text" id="modifyType" required>
                </div>
                <div class="mb-4">
                    <label for="modifyLieuDepart">Lieu de départ</label>
                    <input type="text" id="modifyLieuDepart" required>
                </div>
                <div class="mb-4">
                    <label for="modifyLieuArriver">Lieu d'arrivée</label>
                    <input type="text" id="modifyLieuArriver" required>
                </div>
                <div class="mb-4">
                    <label for="modifyDateDepart">Date de départ</label>
                    <input type="date" id="modifyDateDepart" required>
                </div>
                <div class="mb-4">
                    <label for="modifyDateArriver">Date d'arrivée</label>
                    <input type="date" id="modifyDateArriver" required>
                </div>
                <div class="mb-4">
                    <label for="modifyNombreProduits">Nombre de produits</label>
                    <input type="number" id="modifyNombreProduits">
                </div>
                <div class="mb-4">
                    <label for="modifyDistance">Distance</label>
                    <input type="number" id="modifyDistance" required>
                </div>
                <div class="mb-4">
                    <label for="modifyStatus">Status</label>
                    <select id="modifyStatus" required>
                        <option value="Ouvert">Ouvert</option>
                        <option value="Fermé">Fermé</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="modifyEtat">État</label>
                    <select id="modifyEtat" required>
                        <option value="Attente">Attente</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="button" id="modifyCancelButton" class="mr-2">Annuler</button>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>







    <script type="module" src="./dist/index.js"></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

    <script>
    document.addEventListener("DOMContentLoaded", function() {
        var map = L.map('map').setView([5, -22.09], 3);
        var departureMarker;
        var arrivalMarker;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', function(e) {
            if (!departureMarker) {
                departureMarker = L.marker(e.latlng).addTo(map);
                getCountryName(e.latlng.lat, e.latlng.lng, function(countryName) {
                    document.getElementById('lieuDepart').value = lieuDepart;
                });
            } else if (!arrivalMarker) {
                arrivalMarker = L.marker(e.latlng).addTo(map);
                getCountryName(e.latlng.lat, e.latlng.lng, function(countryName) {
                    document.getElementById('lieuArrivee').value = countryName;
                });
                calculateDistance(departureMarker.getLatLng(), arrivalMarker.getLatLng());
            }
        });

        function getCountryName(lat, lng, callback) {
            var url = `https: //nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var countryName = data.address.country || 'Inconnu';
                    callback(countryName);
                })
                .catch(error => {
                    callback('Inconnu');
                });
        }

        function calculateDistance(departureLatLng, arrivalLatLng) {
            var distance = departureLatLng.distanceTo(arrivalLatLng) / 1000;
            document.getElementById('distance').value = distance.toFixed(2) + ' km';
        }

        const departInput = document.getElementById('lieuDepart');
        const arriveeInput = document.getElementById('lieuArrivee');

        // const mapModal = document.getElementById('mapModal');

        // departInput.addEventListener('click', function(e) {
        //     e.preventDefault();
        //     resetMarkers();
        //     mapModal.style.display = 'flex';
        //     setTimeout(() => {
        //         map.invalidateSize();
        //     }, 200);
        // });

        // arriveeInput.addEventListener('click', function(e) {
        //     e.preventDefault();
        //     resetMarkers();
        //     mapModal.style.display = 'flex';
        //     setTimeout(() => {
        //         map.invalidateSize();
        //     }, 200);
        // });

        function resetMarkers() {
            if (departureMarker) {
                map.removeLayer(departureMarker);
                departureMarker = null;
            }
            if (arrivalMarker) {
                map.removeLayer(arrivalMarker);
                arrivalMarker = null;
            }
        }

        // function closeMapModal() {
        //     mapModal.style.display = 'none';
        // }
    });
    </script>

        
</body>

</html>