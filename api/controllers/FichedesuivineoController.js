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
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_en_details', {layout : false, menu : menu, ticket : ticket, my : my, id : id});
                    }
                    else{
                        //Le fiche n'existe pas; nous allons le créer
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_en_details', {layout : false, menu : menu, ticket : ticket, my : my, id : id});
                    }
                });
            }
            else{
                return res.send("Numéro matricule incorrecte");
            }
        })
    },

    post_suivi_details: function(req, res){
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
        var nbr_ticket = req.param("ticket");
        var nom_ticket = [];
        /*
        for(var i=1; i<=nbr_ticket; i++){
            nom_ticket[i] = req.param("ticket"+i);
        }
        */
        
        function recevoir_donnee(req, nbr_ticket, name){
            var tab = [];
            for(var i=1; i<=nbr_ticket; i++){
                if(req.param(name+""+i) == undefined ){
                    tab[i] = "";
                }
                else{
                    tab[i] = req.param(name+""+i);
                }            
            }
            return tab;
        }

        function calcul_note(l1, l2, l3, l4, nbr_ticket){
            function verif(l){
                if(!l || l=="" || l==null){
                    return 0;
                }
                else{
                    return parseInt(l,10);
                }
            }
            var note = [];
            for(var i=1; i<=nbr_ticket; i++){
                l1[i] = verif(l1[i]);
                l2[i] = verif(l2[i]);
                l3[i] = verif(l3[i]);
                l4[i] = verif(l4[i]);
                note[i] = l1[i] + l2[i] + l3[i] + l4[i];      
            }
            return note;
        }
        //Qualité 2
        var nom_ticket = recevoir_donnee(req, nbr_ticket, "ticket");
        var q1l1 = recevoir_donnee(req, nbr_ticket, "q1l1_");
        var q1l1_com = recevoir_donnee(req, nbr_ticket, "inpl1");
        var q1l2 = recevoir_donnee(req, nbr_ticket, "q1l2_");
        var q1l2_com = recevoir_donnee(req, nbr_ticket, "inpl2");
        var q1l3 = recevoir_donnee(req, nbr_ticket, "q1l3_");
        var q1l3_com = recevoir_donnee(req, nbr_ticket, "inpl3");
        var q1l4 = recevoir_donnee(req, nbr_ticket, "q1l4_");
        var q1l4_com = recevoir_donnee(req, nbr_ticket, "inpl4");
        var note_q1 = calcul_note(q1l1, q1l2, q1l3, q1l4, nbr_ticket);
        
        //Qualité 2
        var q2l5 = recevoir_donnee(req, nbr_ticket, "q2l5_");
        var q2l5_com = recevoir_donnee(req, nbr_ticket, "inpl5");
        var q2l6 = recevoir_donnee(req, nbr_ticket, "q2l6_");
        var q2l6_com = recevoir_donnee(req, nbr_ticket, "inpl6");
        var q2l7 = recevoir_donnee(req, nbr_ticket, "q2l7_");
        var q2l7_com = recevoir_donnee(req, nbr_ticket, "inpl7");
        var q2l8 = recevoir_donnee(req, nbr_ticket, "q2l8_");
        var q2l8_com = recevoir_donnee(req, nbr_ticket, "inpl8");
        var note_q2 = calcul_note(q2l5, q2l6, q2l7, q2l8, nbr_ticket);

        //Qualité 3
        var q3l12 = recevoir_donnee(req, nbr_ticket, "q3l12_");
        var q3l12_com = recevoir_donnee(req, nbr_ticket, "inpl12");
        var q3l13 = recevoir_donnee(req, nbr_ticket, "q3l13_");
        var q3l13_com = recevoir_donnee(req, nbr_ticket, "inpl13");
        var q3l14 = recevoir_donnee(req, nbr_ticket, "q3l14_");
        var q3l14_com = recevoir_donnee(req, nbr_ticket, "inpl14");
        var q3l15 = recevoir_donnee(req, nbr_ticket, "q3l15_");
        var q3l15_com = recevoir_donnee(req, nbr_ticket, "inpl15");
        var note_q3 = calcul_note(q3l12, q3l13, q3l14, q3l15, nbr_ticket);
        //Technicité 

        for(i=1; i<=nbr_ticket; i++){
            console.log(i + " note_q3 : " + note_q3[i]);
        }
        for(i=1; i<=nbr_ticket; i++){
            console.log(i + " q3l12_com : " + q3l12_com[i]);
        }
        for(i=1; i<=nbr_ticket; i++){
            console.log(i + " q3l15_com : " + q3l15_com[i]);
        }

    }
}

