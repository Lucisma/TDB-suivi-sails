/**
 * FichedesuivineoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    fichedesuiviendetail : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        // const id=8054;
        const depart = req.session.id_departement;
        var sql = "SELECT * FROM neocles_manager WHERE matricule ='"+id+"'";
        Neocles_manager.query(sql, function(err, resultat){
            if(err) return res.send(err);
            //console.log(resultat.rows[0].nom);
            if(resultat.rowCount == 1){
                var manager = true;
            }
            else{
                var manager = false;
            }
            return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id});
        });
        
    },
    fichedesuivideconformite : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        // const id=8054;
        const depart = req.session.id_departement;
        var sql = "SELECT * FROM neocles_manager WHERE matricule ='"+id+"'";
        Neocles_manager.query(sql, function(err, resultat){
            if(err) return res.send(err);
            //console.log(resultat.rows[0].nom);
            if(resultat.rowCount == 1){
                var manager = true;
            }
            else{
                var manager = false;
            }
            return res.view('pages/neocles/fiche_de_suivi/fichedesuivideconformite', {layout : false, menu : menu, manager: manager, id:id});
        });
    },

    suivideconformite : function(req, res){
        var id = parseInt(req.param("id"), 10);
        var my = req.param("my");
        var annee = parseInt( my.substr( 0, 4), 10);
        var mois = parseInt( my.substr( 5, 2), 10);
        var sql = "SELECT * FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date) = "+mois+" AND date_part('year', date) = "+annee;
        Neocles_fiche.query(sql, function(err, resultat){
            if(err) return res.send(err);
            if(resultat.rowCount == 1){
                var existe = true;
            }
            else{
                var existe = false;
            }
        });
        return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite');
    }
};

