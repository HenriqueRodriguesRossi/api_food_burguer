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
    numero_de_pedidos:{
        type: Number,
        required: false,
        default: 0
    },
    criado_em:{
        type: Date,
        default: new Date()
    },
    restaurante_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurante"
    }],
})

module.exports = mongoose.model("Dishe", DishesSchema)