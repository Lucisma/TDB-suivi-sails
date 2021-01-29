function suivi_conformite(){
    var id= $("#id_pers").val() ;
    var mois = $("#mois").val();
    if(id && mois){
        $("#tableau_conformite").empty();
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
}

function suivi_en_details(){
    var id= $("#id_pers").val() ;
    var mois = $("#mois").val();
    if(id && mois){
        $("#tableau_en_details").empty();
        $.ajax({
        url : '/suivi_en_details', // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        data : 'id=' + id+'&my='+mois,
        dataType : 'html', // On désire recevoir du HTML
        success : function(code_html, statut){ // code_html contient le HTML renvoyé
            $("#tableau_en_details").append(code_html);
        }
    });
   }
    
}

