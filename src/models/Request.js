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
    id_prato:{
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
    },
    id_restaurante: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurante"
    }],
    usuario_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    id_prato:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishe"
    }]
})

module.exports = mongoose.model("Request", RequestSchema)