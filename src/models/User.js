const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    document:{
        type: String,
        required: true,
        unique: true
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})