module.exports = {

    
    fiche_suivi_conformite: function(id_fiche){
        var id_fiche = id_fiche;
        var sql = "SELECT * FROM neocles_fiche WHERE id = "+id_fiche;
  
        Neocles_fiche.query( sql, function(err, resultat){
            if(err) return res.send(err);
            console.log("resultat : ");
            console.log(resultat);
            var donne = "metyyy";
            return donne;
        });
    }
}