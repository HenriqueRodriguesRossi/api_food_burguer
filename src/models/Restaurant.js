const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({
    nome:{
        type: String, 
        required: true,
        unique: true
    },
    email_profissional:{
        type: String,
        required: true
    },
    senha_de_acesso:{
        type: String,
        required: true
    },
    cnpj:{
        type: String,
        required: true,
        unique: true
    },
    cep:{
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    bairro:{
        type: String,
        required: true
    },
    cidade:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    horario_de_abertura:{
        type: String,
        required: true
    },
    horario_de_fechamento:{
        type: String,
        required: true
    },
    criado_em:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Restaurante", RestaurantSchema)