function suivi_conformite(){
    alert("EEEEE");
    var id=8056;
    var mois = 02;
    var annee = 2020;
    /*
    $.get(
        '/suivi_conformite', // Le fichier cible côté serveur.
        //'id=' + id +'&mois=' + mois + '&annee='+ annee, // Nous utilisons false, pour dire que nous n'envoyons pas de données.
        'id='+5000,
        fonction_retour, // Nous renseignons uniquement le nom de la fonction de retour.
        'text' // Format des données reçues.
    );
    
    function fonction_retour(text){
        alert("Teste");
        alert(text);
    }
    */
   $.ajax({
    url : '/suivi_conformite', // La ressource ciblée
    type : 'GET', // Le type de la requête HTTP.
    data : 'id=' + id,
    dataType : 'html', // On désire recevoir du HTML
    success : function(code_html, statut){ // code_html contient le HTML renvoyé
        alert(code_html);
    }
 });
}