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
                sql = "select neo.id_pers, pers.appelation from neo_pers_niveau neo INNER JOIN r_personnel pers ON neo.id_pers = pers.id_pers";
                Neo_pers_niveau.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    //console.log(resultat.rows[0].appelation);
                    var nbr = resultat.rowCount;
                    return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat, nbr:nbr});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id});
            }
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
        //const id=8054;
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

    suivi_conformite : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";

        var id = req.param("id");
        var my = req.param("my");
        var annee = my.substr( 0, 4);
        var mois = my.substr( 5, 2);
        var sql = "select id_niveau from neo_pers_niveau where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')";
        Neo_pers_niveau.query(sql, function(err, resultat){
            if(err) return res.send(err);
            if(resultat.rowCount != 0){               
                if(resultat.rows[0].id_niveau == 5){
                    var niveau = 2;
                    var ticket = 20;
                }
                else{
                    var niveau = 1;
                    var ticket = 13;
                }
                sql = "SELECT * FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date) = "+mois+" AND date_part('year', date) = "+annee;
                Neocles_fiche.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    if(resultat.rowCount == 1){
                        //Le fiche existe déjà
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket : ticket});
                    }
                    else{
                        //Le fiche n'existe pas; nous allons le créer
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket : ticket});
                    }
                });
            }
            else{
                return res.send("Numéro matricule incorrecte");
            }
        })
        
    },

    suivi_en_details : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        var id = req.param("id");
        var my = req.param("my");
        var annee = my.substr( 0, 4);
        var mois = my.substr( 5, 2);

        var sql = "select id_niveau from neo_pers_niveau where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')";
        Neo_pers_niveau.query(sql, function(err, resultat){
            if(err) return res.send(err);
            if(resultat.rowCount != 0){               
                if(resultat.rows[0].id_niveau == 5){
                    var niveau = 2;
                    var ticket = 20;
                }
                else{
                    var niveau = 1;
                    var ticket = 13;
                }
                sql = "SELECT * FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date) = "+mois+" AND date_part('year', date) = "+annee;
                Neocles_fiche.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    if(resultat.rowCount == 1){
                        //Le fiche existe déjà
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_en_details', {layout : false, menu : menu, ticket : ticket});
                    }
                    else{
                        //Le fiche n'existe pas; nous allons le créer
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_en_details', {layout : false, menu : menu, ticket : ticket});
                    }
                });
            }
            else{
                return res.send("Numéro matricule incorrecte");
            }
        })
    },
};

