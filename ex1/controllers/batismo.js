var Batismo = require('../models/batismo')

module.exports.listar = () => {
    return Batismo
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Batismo
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = b => {
    var novo = new Batismo(b)
    return novo.save()
}

module.exports.remover = function(id){
    return Batismo.deleteOne({_id: id})
}

module.exports.alterar = function(b){
    return Batismo.findByIdAndUpdate({_id: b._id}, b, {new: true})
}
