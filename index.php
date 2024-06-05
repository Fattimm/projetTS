<?php        
        
    $page_file = "./pages/acceuil.php";    
        if (file_exists($page_file)) {
            require_once "./pages/acceuil.php";
        } else {
            echo "<p>Page not found</p>";
        }
?>
</div>