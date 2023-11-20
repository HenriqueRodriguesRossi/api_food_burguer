const Restaurante = require("../models/Restaurant")
const yup = require("yup")
const captureErrorYup = require("../utils/captureErrorYup")
const axios = require("axios")

exports.newRestaurant = async(req, res)=>{
    try{
        const {nome, email_profissional, senha_de_acesso, cnpj, cep, rua, bairro, cidade, estado, horario_de_abertura, horario_de_fechamento} = req.body

        const RestauranteSchema = yup.object().shape({
            nome: yup.string().required("O nome do restaurante é obrigatório!"),
            email_profissional: yup.string().email("Digite um email válido!").required("O email profissional é obrigatório!"),
            senha_de_acesso: yup.string().required("A senha de acesso é obrigatória!").min(6, "A senha de acesso deve ter no mínimo 6 caracteres!").max(30, "A senha de acesso deve ter no máximo 30 caracteres!"),
            cnpj: yup.string().length(14, "O cnpj deve ter 14 caracteres!").required("O cnpj é obrigatório!"),
            cep: yup.string().required("O cep é obrigatório!").length(8, "O cep deve ter 8 caracteres!"),
            rua: yup.string().required("O nome da rua é obrigatório!"),
            bairro: yup.string().required("O bairro é obrigatório!"),
            cidade: yup.string().required("O nome da cidade é obrigatório!"),
            estado: yup.string().required("O estado é obrigatório!"),
            horario_de_abertura: yup.string().required("O horário de abertura do restaurante é obrigatório!"),
            horario_de_fechamento: yup.string().required("O horário de fechamento do restaurante é obrigatório!"),
        })

        await RestauranteSchema.validate(req.body, {abortEarly: false})

        const nomeValidate = await Restaurante.findOne({nome})

        const emailProfissionalValidate = await Restaurante.findOne({email_profissional})

        if(nomeValidate){
            return res.status(422).send({
                mensagem: "Já existe uma empresa cadastrada com esse nome!"
            })
        }else if(emailProfissionalValidate){
            return res.status(422).send({
                mensagem: "Já existe uma empresa cadastrada com esse email profissional!"
            })
        }

        axios.get(`viacep.com.br/ws/${cep}/json/`)
        .then((response)=>{
            console.log(response)
            const apiViaCepResponse = response
        }).catch((error)=>{
            console.log(error)
            return res.status(400).send({
                mensagem: "Cep inválido!"
            })
        })
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