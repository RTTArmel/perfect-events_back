var controllerAdmin = require('../Cotrollers/controller_admin');
var controllerArticle = require('../Cotrollers/controller_service');
var controllerClient = require('../Cotrollers/controller_client');
var controllerListe = require('../Cotrollers/controller_liste');

module.exports.route = function (app) {

    app.route('/admin').get(controllerAdmin.getAdmin)
    app.route('/register').post(controllerAdmin.postAdmin)
    app.route('/editProfil/:id').put(controllerAdmin.updateAdmin)
    app.route('/deleteProfil/:id').delete(controllerAdmin.deleteAdmin)
    app.route('/login').post(controllerAdmin.postLogin)

    app.route('/service').post(controllerArticle.createService);
    app.route('/service/:id').put(controllerArticle.updateService);
    app.route('/service/:id').delete(controllerArticle.deleteService);
    app.route('/service').get(controllerArticle.findAllService);
    app.route('/service/:image').get(controllerArticle.findOneService);
    app.route('/desactivation/:id').get(controllerArticle.desactivation);
    app.route('/activation/:id').get(controllerArticle.activation);
    app.route('/service/:id').get(controllerArticle.findOne);
    // app.get('/user/:photo_profil', pers.lireImage);

    app.route('/client').post(controllerClient.postClient);
    app.route('/signin').post(controllerClient.loginClient);

    app.route('/postList').post(controllerListe.createListe);
    app.route('/getList').get(controllerListe.findAllListe);
    app.route('/updateList/:id').put(controllerListe.updateList);

}

 /*     app.route('/update/:id')
            .put(notes.updateDonnee)
        app.route('/delete/:id')
            .delete(notes.deleteDonnee)
    
        app.route('/image/:im')
            .get(notes.image)
    
    
        app.route('/article')
            .post(notes.postArticle)
        .get(notes.getArt)
    
        app.route('/comment')
            .put(notes.commentaire)
    
        app.route('/login')
            .post(notes.postLogin)
            
        app.route('/')
            .get(notes.getDonne)
            .post(notes.postDonne)
      app.route('/')
      .get(notes.getDonne) */
