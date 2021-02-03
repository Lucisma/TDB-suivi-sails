/**
 * CoachingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    fichecoaching : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        var sql = "SELECT * FROM neocles_manager WHERE matricule ='"+id+"'";
        Neocles_manager.query(sql, function(err, resultat){
            if(err) return res.send(err);
            //console.log(resultat.rows[0].nom);
            if(resultat.rowCount == 1){
                var manager = true;
                sql = "select distinct(neo.id_pers), pers.appelation from neo_pers_niveau neo INNER JOIN r_personnel pers ON neo.id_pers = pers.id_pers";
                Neo_pers_niveau.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    //console.log(resultat.rows[0].appelation);
                    return res.view('pages/neocles/fiche_de_suivi/fichedecoaching', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedecoaching', {layout : false, menu : menu, manager: manager, id:id});
            }
        });
    },

    suivi_coaching : function (req, res) {
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        var id_pers = req.param("id");
        var my = req.param("my");
        var annee = my.substr( 0, 4);
        var mois = my.substr( 5, 2);
        var date_now = new Date().toISOString().slice(0,10);
        var mois_now = date_now.substr( 5, 2);
        var annee_now = date_now.substr( 0, 4);

        var sql = "select * from neocles_compte_rendu where id_pers ="+id_pers+" and date_part('year', date_compte_rendu) = "+annee;
        Neocles_manager.query(sql, function (err, resultat) {
            if(err) return res.send(err);
            var disabled = [], couleur = [];
            for(var i =1; i<=12; i++){
                disabled[i] =  "disabled";
                couleur[i] = "bleu";
            }
            if(resultat.rowCount == 0){
                if(annee == annee_now){
                    disabled[1] = "";
                    if(mois_now > 1){
                        couleur[1] = "red";
                    }                   
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur, id_pers, annee})
                }
                else{
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur,id_pers, annee})
                }
            }
        })
    }
};

