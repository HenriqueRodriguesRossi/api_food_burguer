const mongoose = require("mongoose")

const DishesSchema = new mongoose.Schema({
    restaurante_id:{
        type: String,
        required: true
    },
    nome_do_prato:{
        type: String,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    foto:{
        type: String,
        required: true
    },
    criado_em:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Dishes", DishesSchema)