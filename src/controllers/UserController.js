const User = require("../models/User")
const axios = require("axios")
const yup = require("yup")
const captureErrorYup = require("../utils/captureErrorYup")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.newUser = async (req, res)=>{
    try{
        const {nome_completo, cpf, data_de_aniversario, email, senha, repita_senha} = req.body

        const UserSchema = yup.object().shape({
            nome_completo: yup.string().required("O nome completo é obrigatório!"),
            cpf: yup.string().min(11, "O cpf deve ter 11 caracteres!").max(11, "O cpf deve ter 11 caracteres!").required("O cpf é obrigatório!"),
            data_de_aniversario: yup.date().max(new Date(), "Não são aceitas datas no futuro!").required("A data de aniversario é obrigatória!"),
            email: yup.string().email("Digite um email válido!").required("O email é obrigatório!"),
            senha: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres!").max(30, "A senha deve ter no máximo 30 caracteres!").required("A senha é obrigatória!"),
            repita_senha: yup.string().required("O campo repita a senha é obrigatório!").oneOff([senha, null], "As senhas devem ser iguais!")
        })

        await UserSchema.validate(req.body, {abortEarly: false})

        const cpfValidate = await User.findOne({cpf})

        const emailValidate = await User.findOne({email})

        if(cpfValidate){
            return res.status(422).send({
                mensagem: "Esse cpf já está em uso!"
            })
        }else if(emailValidate){
            return res.status(422).send({
                mensagem: "Esse email já está em uso!"
            })
        }

        const senhaHash = await bcrypt.hash(senha, 10)
        const cpfHash = await bcrypt.hash(cpf, 12)

        const novoUsuario = new User({
            nome_completo,
            cpf: cpfHash,
            data_de_aniversario,
            email,
            senha: senhaHash
        })

        await novoUsuario.save()

        return res.status(201).send({
            mensagem: "Usuário cadastrado com sucesso!",
            infos: novoUsuario
        })
    }catch(error){
        if(error instanceof yup.ValidationError){
            const errors = [captureErrorYup(error)]

            return res.status(422).send({
                mensagem: "Erro ao cadastrar usuário!",
                erros: errors
            })
        }else{
            return res.status(500).send({
                mensagem: "Erro ao cadastrar o usuário!"
            })
        }
    }
}

exports.login = async (req, res)=>{
    try{
        const {email, senha} = req.body

        if(!email || !senha){
            return res.status(400).send({
                mensagem: "Preencha o email e a senha!"
            })
        }

        const user = await User.findOne({email})
        const comparaSenha = await bcrypt.compare(senha, user.senha)

        if(!user || !comparaSenha){
            return res.status(404).send({
                mensagem: "Email ou senha estão incorretas!"
            })
        }

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id
        }, secret)

        return res.status(200).send({
            mensagem: "Login efetuado com sucesso!",
            id: user._id,
            token: token
        })
    }catch(error){
        return res.status(500).send({
            mensagem: "Erro ao efetuar o login!"
        })
    }
}

exports.alterPass = async(req, res)=>{
    try{
        const {user_id} = req.params
        const {email, novaSenha} = req.body

        if(!user_id || !email || !novaSenha){
            return res.status(400).send({
                mensagem: "Passe todas as informações necessárias!"
            })
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha, 10)

        const buscaUsuario = await User.findByIdAndUpdate({
            _id: user_id, 
            email: email,
            senha: novaSenhaHash
        })

        if(!buscaUsuario){
            return res.status(404).send({
                mensagem: "Nenhum usuário encontrado!"
            })
        }else{
            return res.status(200).send({
                mensagem: "Senha alterada com sucesso!",
                info: buscaUsuario
            })
        }
    }catch(error){
        return res.status(500).send({
            mensagem: "Erro ao alterar a senha!"
        })
    }
}

exports.deleteAccount = async(req, res)=>{
    try{
        const {user_id} = req.params

        if(!user_id){
            return res.status(400).send({
                mensagem: "Forneça o id do usuário!"
            })
        }

        const deleteAccount = await User.findByIdAndDelete({
            _id: user_id
        })

        if(!deleteAccount){
            return res.status(404).send({
                mensagem: "Nenhuma conta encontrada!"
            })
        }else{
            return res.status(200).send({
                mensagem: "Conta excluída com sucesso!"
            })
        }
    }catch(error){
        return res.status(500).send({
            mensagem: "Erro ao excluir a conta!"
        })
    }
}