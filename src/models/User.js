const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nome_completo: {
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true,
        unique: true
    },
    data_de_aniversario:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    criado_em:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("User", UserSchema)