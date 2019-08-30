const Liste = require('../Models/modele.liste');
const fs = require('fs')

//Create new Liste
exports.createListe = (req, res) => {
    Liste.find()
        .then(user => {
            var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }
            const liste = new Liste({
                _id: id,
                idClient: req.body.idClient,
                idService: req.body.idService,
                afficheList: true
            });
            liste.save()
                .then(() => {
                    Liste.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the Liste"
                    });
                });
        })
};

module.exports.updateList = (req, res) => {
    var idClient = req.body.idClient
    var idService = req.body.idService
    var afficheList = req.body.afficheList
    Liste.findByIdAndUpdate(req.params.id, { idClient: idClient, idService: idService, afficheList: afficheList }, (err, product) => {
        Liste.find()
            .then(note => { res.send(note) })
    })
};

exports.findAllListe = (req, res) => {
    Liste.find()
        .then(liste => {
            res.send(liste);
        }).catch(err => {
            res.status(500).send(liste => {
                message: err.message || "Something wrong while retrieving Service."
            });
        });
};