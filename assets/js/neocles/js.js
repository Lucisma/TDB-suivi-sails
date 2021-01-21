function suivi_conformite(){
    var id= $("#id_pers").val() ;
    var mois = $("#mois").val();
    
    // $.get(
    //     '/suivi_conformite', // Le fichier cible côté serveur.
    //     //'id=' + id +'&mois=' + mois + '&annee='+ annee, // Nous utilisons false, pour dire que nous n'envoyons pas de données.
    //     'id=' + id+'&my='+mois,
    //     fonction_retour, // Nous renseignons uniquement le nom de la fonction de retour.
    //     'html' // Format des données reçues.
    // );
    
    // function fonction_retour(code_html){
    //     alert(code_html);
    // }
    

   $.ajax({
    url : '/suivi_conformite', // La ressource ciblée
    type : 'GET', // Le type de la requête HTTP.
    data : 'id=' + id+'&my='+mois,
    dataType : 'html', // On désire recevoir du HTML
    success : function(code_html, statut){ // code_html contient le HTML renvoyé
        $("#tableau_conformite").append(code_html);
    }
 });
}