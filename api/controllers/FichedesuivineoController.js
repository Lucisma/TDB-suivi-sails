/**
 * FichedesuivineoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var service  = require('../services/FicheSuivi');
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
        var create = false;
        if(req.param('create')){
            create = true;
        }
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
                    return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat, create: create});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id,create: create});
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
        var update = false
        if(req.param("update")){
            update = true
        };
        //const id=8054;
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
                    return res.view('pages/neocles/fiche_de_suivi/fichedesuivideconformite', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat, update: update});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedesuivideconformite', {layout : false, menu : menu, manager: manager, id:id, update: update});
            }
            
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
        var update= false;
        var fiche ;
        //var sql = "select id_niveau from neo_pers_niveau where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')";
        var sql = "select pers_niv.id_niveau, niv.seuil_ticket from neo_pers_niveau pers_niv INNER JOIN neo_niveau niv ON pers_niv.id_niveau = niv.id  where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')"
        Neo_pers_niveau.query(sql, function(err, resultat){
            if(err) return res.send(err);
            if(resultat.rowCount != 0){
                var seuil_ticket = resultat.rows[0].seuil_ticket;           
                if(resultat.rows[0].id_niveau == 5){
                    var niveau = 2;
                    var ticket = 20;
                }
                else{
                    var niveau = 1;
                    var ticket = 13;
                }
                sql = "SELECT id FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date_fiche) = "+mois+" AND date_part('year', date_fiche) = "+annee;
                Neocles_fiche.query(sql,  function(err, resultat){
                    if(err) return res.send(err);
                    if(resultat.rowCount == 1){
                        fiche = true;
                        var id_fiche = resultat.rows[0].id;

                        //Nom ticket et son id
                        sql = "SELECT num, nom, t3, note as note_tec, ticket.id as ticket_id from neocles_technicite tec INNER JOIN neocles_ticket ticket ON tec.id_ticket = ticket.id WHERE ticket.id_fiche = "+ id_fiche+" ORDER BY num;";
                        Neocles_fiche.query(sql, function(err, ticket_tec){
                            if(err) return res.send(err);
                            sql = "select note as note_q1 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 1 ORDER BY tic.num";
                            Neocles_fiche.query(sql, function(err, qualite1){
                                if(err) return res.send(err);
                                //return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket_tec : ticket_tec, qualite : qualite});
                                sql = "select note as note_q2 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 2 ORDER BY tic.num";
                                Neocles_fiche.query(sql, function(err, qualite2){
                                    if(err) return res.send(err);
                                    //return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket_tec : ticket_tec, qualite : qualite});
                                    sql = "select note as note_q3 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 3 ORDER BY tic.num";
                                    Neocles_fiche.query(sql, function(err, qualite3){
                                        if(err) return res.send(err);
                                        sql = "select inactivite, auto_affectation from neocles_implication imp INNER JOIN neocles_ticket tic ON imp.id_ticket = tic.id WHERE tic.id_fiche="+ id_fiche+" ORDER BY tic.num ";
                                        Neocles_fiche.query(sql, function(err, implication){
                                            if(err) return res.send(err);
                                            return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, fiche: fiche, ticket_tec : ticket_tec, qualite1, qualite2, qualite3, seuil_ticket: seuil_ticket, ticket : ticket, my : my, id : id, imp : implication});
                                        })
                                        
                                    })
                                })
                            })
                                               
                        })
                                               
                    }
                    else{
                        //Le fiche n'existe pas; nous allons le créer
                        fiche = false;
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket : ticket, my : my, id : id, fiche: fiche});
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
                sql = "SELECT * FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date_fiche) = "+mois+" AND date_part('year', date_fiche) = "+annee;
                Neocles_fiche.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    if(resultat.rowCount == 1){
                        //Le fiche existe déjà
                        var id_fiche = resultat.rows[0].id;
                        //Ticket
                        sql = "select * from neocles_ticket where id_fiche = " + id_fiche;
                        Neocles_fiche.query(sql, function(err, donne_ticket){
                            if(err) return res.send(err);
                            var nbr_ticket = donne_ticket.rowCount;
                            sql = "select qua.num as type_qaulite, q1, q2, q3, q4, note, tic.num as num_ticket from neocles_qualite qua INNER JOIN neocles_ticket tic ON qua.id_ticket = tic.id where tic.id_fiche = "+id_fiche+" ORDER BY tic.num ";
                            Neocles_fiche.query(sql, function(err, qualite){
                                if(err) return res.send(err);
                                sql = "select num, t1, t2, t3, note from neocles_technicite tec INNER JOIN neocles_ticket tic ON tec.id_ticket = tic.id where tic.id_fiche = "+id_fiche+" ORDER BY tic.num ";
                                Neocles_fiche.query(sql, function(err, technicite){
                                    if(err) return res.send(err);
                                    sql = "select type, com1, com2, com3, com4, tic.num from neocles_commentaire tec INNER JOIN neocles_ticket tic ON tec.id_ticket = tic.id where tic.id_fiche = "+id_fiche+" ORDER BY tic.num ";
                                    Neocles_fiche.query(sql, function(err, commentaire){
                                        if(err) return res.send(err);
                                        return  res.view('pages/neocles/fiche_de_suivi/update_tableau_details', {layout : false, menu : menu, donne_ticket : donne_ticket, ticket: nbr_ticket, my : my, id : id, qualite:qualite, technicite: technicite });
                                    })
                                    //return res.send("id_fiche");
                                    
                                })
                            })
                        })
                        
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
        var id_pers = parseInt( req.param("id"), 10);
        var my = req.param("my");
        var nbr_ticket = req.param("ticket");
        var date_now = new Date().toISOString().slice(0,10);
        var date_ticke = new Date(my).toISOString().slice(0,10);

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
        var tec1 = recevoir_donnee(req, nbr_ticket, "tec1_");
        var tec1_com = recevoir_donnee(req, nbr_ticket, "inpl9");
        var tec2 = recevoir_donnee(req, nbr_ticket, "tec2_");
        var tec2_com = recevoir_donnee(req, nbr_ticket, "inpl10");
        var tec3 = recevoir_donnee(req, nbr_ticket, "tec3_");
        var tec3_com = recevoir_donnee(req, nbr_ticket, "inpl16");
        var note_tec = tec1;

        //insertion fiche
        var sql = "insert into neocles_fiche(id_pers, id_manager, date_creation, date_fiche) values("+id_pers+","+id+",'"+date_now+"','"+date_ticke+"')";
        Neocles_fiche.query(sql, function(err){
            if(err) return res.send(err);
            //sql = "insert into neocles_ticket(num, nom, id_fiche) values(1, 'test', 1)";
            sql = "select id as id_fiche from neocles_fiche where id_pers = "+id_pers+" AND id_manager = "+id+" AND date_fiche = '"+date_ticke+"'";   
            Neocles_fiche.query(sql, function(err, resultat){
                if(err) return res.send(err);
                if(resultat.rowCount == 1){
                    var id_fiche = resultat.rows[0].id_fiche;

                    //Insertion ticket et son nom dans la table ticket
                    var id_ticket = 0 , num_colone=0;
                    for(var i = 1; i<=nbr_ticket; i++ ){                       
                        sql = "insert into neocles_ticket(num, nom, id_fiche) values ("+i+",'"+nom_ticket[i]+"',"+id_fiche+")";
                        Neocles_fiche.query(sql, function(err){
                            if(err){
                                return res.send(err);
                            } 
                        })
                    }

                    //Select id_ticket et num ticket
                    sql = "select id as id_ticket, num from neocles_ticket where id_fiche = "+id_fiche;
                    Neocles_fiche.query(sql, function(err, resultat){
                        if(err) return res.send(err);
                        
                        //insertion qualité
                        for(var i =0; i<resultat.rowCount; i++){
                            //console.log(resultat.rows[i].id_ticket + " et num " + resultat.rows[i].num);
                            id_ticket = resultat.rows[i].id_ticket;
                            num_colone = resultat.rows[i].num;
                            insertion_qualite(1, id_ticket, q1l1, q1l2, q1l3, q1l4, note_q1, num_colone);
                            insertion_qualite(2, id_ticket, q2l5, q2l6, q2l7, q2l8, note_q2, num_colone);
                            insertion_qualite(3, id_ticket, q3l12, q3l13, q3l14, q3l15, note_q3, num_colone);
                            insertion_commentaire("q1", id_ticket, q1l1_com, q1l2_com, q1l3_com, num_colone, q1l4_com);
                            insertion_commentaire("q2", id_ticket, q2l5_com, q2l6_com, q2l7_com, num_colone, q2l8_com);
                            insertion_commentaire("q3", id_ticket, q3l12_com, q3l13_com, q3l14_com, num_colone, q3l15_com);
                            insertion_commentaire("tec", id_ticket, tec1_com, tec2_com, tec3_com, num_colone);
                            insertion_technicite(id_ticket, tec1, tec2, tec3, num_colone, note_tec);

                        }
                        return res.redirect("/fiche_suivi_en_detail/create");

                        
                    })

                    function insertion_qualite(num_qualite, id_ticket, q1, q2, q3, q4, note, num_colone){
                        var sql = "insert into neocles_qualite(num, id_ticket, q1, q2, q3, q4, note) values("+num_qualite+","+id_ticket+",'"+q1[num_colone]+"','"+q2[num_colone]+"','"+q3[num_colone]+"','"+q4[num_colone]+"',"+note[num_colone]+")";
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                        })                     
                    } 
                    
                    function insertion_commentaire(type, id_ticket, com1, com2, com3,  num_colone, com4 = ""){
                        var sql;
                        if(type == "tec"){
                            sql = "insert into neocles_commentaire(id_ticket, type, com1, com2, com3) values("+id_ticket+",'"+type+"','"+com1[num_colone]+"','"+com2[num_colone]+"','"+com3[num_colone]+"')";
                        }
                        else{
                            sql = "insert into neocles_commentaire(id_ticket, type, com1, com2, com3, com4) values("+id_ticket+",'"+type+"','"+com1[num_colone]+"','"+com2[num_colone]+"','"+com3[num_colone]+"','"+com4[num_colone]+"')";
                        }
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                        }) 
                    }

                    function insertion_technicite(id_ticket, t1, t2, t3, num_colone, note){
                        if(!t1[num_colone || t1[num_colone] == '']){
                            t1[num_colone] = null;
                        }
                        var sql = "insert into neocles_technicite(id_ticket, t1, t2, t3, note) values("+id_ticket+","+t1[num_colone]+",'"+t2[num_colone]+"','"+t3[num_colone]+"',"+note[num_colone]+")";
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                        }) 
                    }
                }
            })
        })
    },

    post_update_conformite: function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = parseInt( req.session.user, 10);
        var id_pers = parseInt( req.param("id"), 10);
        var my = req.param("my");
        var nbr_ticket = req.param("ticket");
        var date_now = new Date().toISOString().slice(0,10);
        var date_ticke = new Date(my).toISOString().slice(0,10);
        function recevoir(req, nbr_ticket, name){
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

        var inactivite = recevoir(req, nbr_ticket, "inactivite");
        var auto_affect = recevoir(req, nbr_ticket, "affect");
        var id_ticket = recevoir(req, nbr_ticket, "id_ticket")

        function insertion_implication(id_ticket, inactivite, auto_affect){
            var sql = "insert into neocles_implication(id_ticket, inactivite, auto_affectation) values("+id_ticket+",'"+inactivite+"','"+auto_affect+"')";
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
                
            })                     
        }

        function update_implication(id_ticket, inactivite, auto_affect){
            var sql = "update neocles_implication set inactivite = '"+inactivite+"', auto_affectation = '"+auto_affect+"' WHERE id_ticket = "+ id_ticket;
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);                
            })  
        }

        var implic = req.param("implic");
        var ina, aff, id_tic;
        for(var i =1; i<= nbr_ticket; i++){
            ina = inactivite[i];
            aff = auto_affect[i];
            id_tic = id_ticket[i];
            if(implic){
                update_implication(id_tic, ina, aff);
            }
            else{
                insertion_implication(id_tic, ina, aff);
            }
            
        }
        return res.redirect("/fiche_suivi_de_conformite/update");
    }
}

