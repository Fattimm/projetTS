<?php

header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate"); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);
    
    $file_path = '../data.json';

    if (!is_writable($file_path)) {
        http_response_code(500);
        echo json_encode(['message' => 'Le fichier data.json n\'est pas accessible en écriture']);
        exit;
    }


    $existingData = json_decode(file_get_contents($file_path), true);
    if ($existingData === null) {
        $existingData = ['cargaison' => []];
    }

    $cargaisonId = $input['cargaisonId'];
    $nouveauProduit = $input;
    

    // Trouver la cargaison correspondante
    $cargaisonTrouvee = false;
    foreach ($existingData['cargaison'] as &$cargaison) {
        if ($cargaison['id'] == $cargaisonId) {
            if (!isset($cargaison['produits'])) {
                $cargaison['produits'] = [];
            }
            $cargaison['produits'][] = $nouveauProduit;
            $cargaisonTrouvee = true;
            break;
        }
    }
    
    if (!$cargaisonTrouvee) {
        http_response_code(404);
        echo json_encode(['message' => 'Cargaison non trouvée']);
        exit;
    }

    if (file_put_contents($file_path, json_encode($existingData, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(['message' => 'Produit ajouté avec succès']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Échec de la sauvegarde des données']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Méthode non autorisée']);
}
?>






<!-- 

header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate"); 


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $file_path = '../data.json';


    if (!is_writable($file_path)) {
        http_response_code(500);
        echo json_encode(['message' => 'Le fichier data.json n\'est pas accessible en écriture']);
        exit;
    }

    $existingData = json_decode(file_get_contents($file_path), true);
    if ($existingData === null) {
        $existingData = ['cargaison' => []];
    }

   
    $existingData['cargaison'][] = $input;

    if (file_put_contents($file_path, json_encode($existingData, JSON_PRETTY_PRINT))) {
        
        http_response_code(200);
        echo json_encode(['message' => 'Données sauvegardées avec succès']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Échec de la sauvegarde des données']);
    }
} else {
   
    http_response_code(405);
    echo json_encode(['message' => 'Méthode non autorisée']);
}

echo json_encode($data);
 -->
