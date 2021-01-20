const { json } = require('express');
var express = require('express');
var router = express.Router();
var Batismo = require('../controllers/batismo')

router.get('/batismos', function(req, res, next){
    if(req.query.ano){
        Batismo.listar()
        .then(batismos => {
            result = []
            batismos.forEach(b => {
                if(b.ano == parseInt(req.query.ano)){
                    result.push(b)
                }
            });
            res.status(200).jsonp(result)
        })
        .catch(e => res.status(500).jsonp({error: e}))
    }else{
        Batismo.listar()
        .then(batismos => {
            result = []
            batismos.forEach(b => {
                result.push({id: b._id, date: b.date, title: b.title, ref: b.ref})
            });
            res.status(200).jsonp(result)
        })
        .catch(e => res.status(500).jsonp({error: e}))
    }
    
})

router.get('/batismos/stats', function(req, res, next){
    Batismo.listar()
        .then(batismos => {
            var result = {}
            batismos.forEach(b => {
                if(!result[b.ano]){
                    result[b.ano] = 0
                }
                result[b.ano] += 1
            });
            res.status(200).jsonp(result)
        })
        .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/batismos/batisado', function(req, res, next){
    Batismo.listar()
        .then(batismos => {
            var batisados = new Set()
            batismos.forEach(b => {
                batisados.add(b.batizado)
            });
            console.log(batisados)
            res.status(200).jsonp(Array.from(batisados).sort())
        })
        .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/batismos/progenitores', function(req, res, next){
    Batismo.listar()
        .then(batismos => {
            var progenitores = []
            batismos.forEach(b => {
                progenitores.push({_id: b._id, pai: b.Pai, mae: b.Mae})
            });
            res.status(200).jsonp(progenitores)
        })
        .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/batismos/:id', function(req, res, next){
    Batismo.consultar(req.params.id)
        .then(batismo => {
            res.status(200).jsonp(batismo)
        })
        .catch(e => res.status(500).jsonp({error: e}))
})


module.exports = router;