const Service = require('../Models/modele.service');
const fs = require('fs')

//Create new service
exports.createService = (req, res) => {
    Service.find()
        .then(user => {
            var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }
            let imageFile = req.files.image;
            let imageFile1 = req.files.image1;
            let imageFile2 = req.files.image2;
            let nomImage = id
            let nomImage1 = id + 'a'
            let nomImage2 = id + 'b'
            res.setHeader('Content-Type', 'text/plain');

            imageFile.mv(`${__dirname}/public/${req.body.titre}${nomImage}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            imageFile1.mv(`${__dirname}/public/${req.body.titre}${nomImage1}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            }); imageFile2.mv(`${__dirname}/public/${req.body.titre}${nomImage2}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            const service = new Service({
                _id: id,
                categorie: req.body.categorie,
                titre: req.body.titre,
                utilisateur: req.body.utilisateur,
                prix: req.body.prix,
                description: req.body.description,
                image: req.body.titre + nomImage + '.jpg',
                image1: req.body.titre + nomImage1 + '.jpg',
                image2: req.body.titre + nomImage2 + '.jpg',
                active: req.body.active
            });
            service.save()
                .then(() => {
                    Service.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the Service"
                    });
                });
        })
};

//Get un par un image
exports.findOneService = (req, res) => {
    try {
        let picture = fs.readFileSync('./App/Cotrollers/public/' + req.params.image)
        console.log('params: ', req.params.image);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}



exports.findAllService = (req, res) => {
    Service.find()
        .then(service => {
            res.send(service);
        }).catch(err => {
            res.status(500).send(service => {
                message: err.message || "Something wrong while retrieving Service."
            });
        });
};


//Update Service
exports.updateService = (req, res) => {

    let imageFile = req.files.image;
    let imageFile1 = req.files.image1;
    let imageFile2 = req.files.image2;
    let nomImage = id
    let nomImage1 = id + 'a'
    let nomImage2 = id + 'b'
    res.setHeader('Content-Type', 'text/plain');

    imageFile.mv(`${__dirname}/public/${req.body.titre}${nomImage}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    imageFile1.mv(`${__dirname}/public/${req.body.titre}${nomImage1}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    }); imageFile2.mv(`${__dirname}/public/${req.body.titre}${nomImage2}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    });

    Service.findByIdAndUpdate(req.params.id, {
        titre: req.body.titre,
        utilisateur: req.body.utilisateur,
        prix: req.body.prix,
        description: req.body.description,
        image: req.body.titre + nomImage + '.jpg',
        image1: req.body.titre + nomImage1 + '.jpg',
        image2: req.body.titre + nomImage2 + '.jpg',
        categorie: req.body.categorie,
        active: true
    })
        .then((data) => {
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the profil."
            });
        });
};

//SUPPRESSION SERVICE
module.exports.deleteService = function (req, res) {
    Service.findByIdAndRemove(req.params.id, function (err) {
        Profile.find()
            .then(note => { res.send(note) })
    })
};

// Find a single service with a serviceID
exports.findOne = (req, res) => {
    Service.findById(req.params.ServiceId)
        .then(ServiceChoix => {
            //console.log(unService
            if (!ServiceChoix) {
                return res.status(404).send({
                    message: "Service not found with id" + req.params.ServiceId
                });
            }
            else {
                res.send(ServiceChoix);
            }


        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Servicenot found with id " + req.params.ServiceId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving Servicewith id " + req.params.ServiceId
            });
        });
};

exports.desactivation = (req, res) => {
    Service.findById(req.params.id).then(srvc => {
        Service.findByIdAndUpdate(srvc._id, {
            _id: srvc.id,
            utilisateur: srvc.utilisateur,
            titre: srvc.titre,
            description: srvc.description,
            type: srvc.type,
            prix: srvc.prix,
            image: srvc.image,
            image1: srvc.image1,
            image2: srvc.image2,
            active: false,
        }).then(upd => {
            res.send(upd)
        })

    });

}

exports.activation = (req, res) => {
    Service.findById(req.params.id).then(srvc => {
        Service.findByIdAndUpdate(srvc._id, {
            _id: srvc.id,
            utilisateur: srvc.utilisateur,
            titre: srvc.titre,
            description: srvc.description,
            type: srvc.type,
            prix: srvc.prix,
            image: srvc.image,
            image1: srvc.image1,
            image2: srvc.image2,
            active: true,
        }).then(upd => {
            res.send(upd)
        })

    });
}
