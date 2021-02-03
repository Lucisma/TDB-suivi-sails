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
                couleur[i] = "gris";
            }
            if(resultat.rowCount == 0){
                if(annee == annee_now){
                    disabled[1] = "";
                    couleur[1] = "vert";
                    disabled[2] = "";
                    couleur[2] = "vert"
                    if(mois_now > 1){
                        couleur[1] = "red";
                    }                   
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur, id_pers, annee});
                }
                else if(annee<annee_now){
                    for(var i =1; i<=12; i++){
                        disabled[i] =  "";
                        couleur[i] = "red";
                    }
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur, id_pers, annee});
                }
                else{
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur,id_pers, annee});
                }
            }
        })
    },

    suivi_coaching_month: function (req, res) {
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        var id_pers= req.param("id_pers"), mois = req.param("m"), annee = req.param("y");
        var sql = "select * from neocles_compte_rendu where id_pers ="+id_pers+" and date_part('year', date_compte_rendu) = "+annee+" and date_part('month', date_compte_rendu) = "+mois;
        Neocles_manager.query(sql, function (err, resultat) {
            if(err) return res.send(err);
            if(resultat.rowCount == 1){

            }
            else{
                return res.view('pages/neocles/fiche_de_suivi/Tableau_cr', {layout : false, menu : menu, mois,id_pers, annee})
            }
        })
    },

    compte_rendu_post: function (req, res) {
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        var date_now = new Date().toISOString().slice(0,10);
        
        var id_pers= req.param("id_pers"), mois = req.param("mois"), annee = req.param("annee");
        var q1 = req.param("q1"), q2 = req.param("q2"), t1 = req.param("t1"), t2 = req.param("t2"), imp1 = req.param("imp1"), imp2 = req.param("imp2");
        var submit = req.param("submit");
        var sauve = true;
        var date_compte_rendu_or = annee+"-"+mois+"-01";
        var date_compte_rendu = new Date(annee, mois, 01).toISOString().slice(0,10);
        if(submit == "Conserver"){
            sauve = false;
        }
        console.log(date_now);
        console.log(date_compte_rendu_or);
        console.log(date_compte_rendu);
    }

};

