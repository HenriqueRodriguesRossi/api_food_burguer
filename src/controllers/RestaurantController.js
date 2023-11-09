const Restaurant = require("../models/Restaurant")
const yup = require("yup")
const captureErrorYup = require("../utils/captureErrorYup")

exports.newRestaurant = async(req, res)=>{
    try{
        
    }catch(error){
        if(errors instanceof yup.ValidationError){
            const errors = [captureErrorYup(error)]
            return res.status(422).send({
                mensagem: errors
            })
        }else{
            return res.status(500).send({
                mensagem: "Erro ao criar a conta do restaurante!"
            })
        }
    }
}