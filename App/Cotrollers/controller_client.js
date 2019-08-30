const Client = require('../Models/modele.client');
const fs = require('fs')

//AJOUT DE NOUVEAU CLIENT
module.exports.postClient = function (req, res) {
    var nom = req.body.nom
    var prenom = req.body.prenom
    var telephone = req.body.telephone
    var email = req.body.email
    var password = req.body.password
    var pwd = req.body.pwd

    Client.find()
        .then(note => {
            if (note.length == 0) {
                id = 0;
            } else {
                id = parseInt(note[note.length - 1].id) + 1;
            }
            const profil = new Client({ _id: id, nom: nom, prenom: prenom, telephone: telephone, email: email, password: password });

            if (nom || prenom || telephone || email || password || pwd) {
                (password !== pwd) ? console.log("Erreur passwords") :

                    profil.save()
                        .then((note) => {
                            res.send(note);
                        })
                        .catch(e => {
                            res.status(500).send({ mes: e.mes || "erreur" })
                        })
            }
        })
}

//AUTHENTIFICATION
module.exports.loginClient = function (req, res) {
    var nom = req.body.nom
    var password = req.body.password
    var result;
    Client.find()
        .then(note => {
            for (let i = 0; i < note.length; i++) {
                if ((note[i].nom == nom || note[i].email == nom) && note[i].password == password) {
                    console.log('login validé', note[i]);
                    result = note[i]
                    i = note.length
                } else {
                    console.log('password erroné');
                    result = 'ko'
                }
            }
            res.send(result)
        })
}