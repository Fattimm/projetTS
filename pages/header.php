<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gestion cargaison</title>
    <link href="/var/www/html/projetTsCargaison/dist/output.css" rel="stylesheet">
    <link rel="icon" href="/path/to/your/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <div class="flex h-screen w-screen bg-gray-200">
        <div class="flex flex-col w-1/4 bg-white border-r h-full">
            <div class="flex items-center justify-center h-16 bg-gray-800 text-white text-2xl font-bold">
                Menu
            </div>
            <div class="flex flex-col flex-grow p-4">
                <nav class="flex-1 px-2 space-y-2">
                    <a href="pages/cargaison.php"
                        class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-900">
                        <span class="mx-4 font-medium">Cargaison</span>
                    </a>
                    <a href="pages/produits.php"
                        class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-900">
                        <span class="mx-4 font-medium">Produits</span>
                    </a>
                </nav>
            </div>
        </div>
        <div class="flex flex-col flex-grow h-full">
            <nav class="bg-gray-800 p-4 h-16 flex items-center w-full">
                <div class="container mx-auto flex justify-between items-center">
                    <div class="text-white font-bold text-2xl">Gestion de Cargaison</div>
                    <input type="text" id="searchInput" placeholder="Search for cargaison"
                        class="w-1/3 p-2 border rounded">
                    <input type="date" id="dateInput" class="w-1/6 p-2 border rounded mx-2">
                    <button id="popupButton"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter
                        cargaison</button>
                    <div class="px-4 py-2 rounded-full bg-gray-300">
                        <img src="" alt="User image" class="h-10 w-10 rounded-full">
                    </div>
                </div>
            </nav>