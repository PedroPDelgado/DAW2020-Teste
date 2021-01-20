var express = require('express');
var router = express.Router();
var axios = require('axios')
var rel_permitidas = ["eCruzadoCom", "eComplementarDe", "eSuplementoDe", "eSuplementoPara"]

var token
axios.post('http://clav-api.di.uminho.pt/v2/users/login', {username: "daw2020@teste.uminho.pt", password: "232"})
        .then(dados => {
          token = dados.data.token
        })
        .catch(err => console.log("Erro ao pedir token" + err))

router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/classes', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => res.render('classes', {classes: dados.data, referer: req.headers.referer}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/classes/:id', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + token)
    .then(dados => {
        axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '/descendencia?token=' + token)
        .then(dados2 => { 
            if(dados.data.nivel == "3"){
              axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '/ti?token=' + token)
                .then(dados3 => {
                  res.render('classe', {classe: dados.data, descendentes: dados2.data, ti: dados3.data, referer: req.headers.referer, nivel3: "sou nivel 3"})
                })
                .catch(e => res.render('error', {error: e}))
            }else{
              res.render('classe', {classe: dados.data, descendentes: dados2.data, referer: req.headers.referer})
            }   
            
        })
        .catch(e => res.render('error', {error: e}))
        
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/ti', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
    .then(dados => res.render('ti', {ti: dados.data, referer: req.headers.referer}))
    .catch(e => res.render('error', {error: e}))
});


module.exports = router;


