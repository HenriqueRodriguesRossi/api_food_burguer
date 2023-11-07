const mongoose = require("mongoose")

const RequestSchema = new mongoose.Schema({
    id_restaurante: {
        type: String,
        required: true
    },
    usuario_id:{
        type: String,
        required: true
    },
    id_comida:{
        type: String,
        required: true
    },
    valor_total:{
        type: Number,
        required: true
    },
    endereco_entrega:{
        type: String,
        required: true
    },
    criado_em:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Request", RequestSchema)