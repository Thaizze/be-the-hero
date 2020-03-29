//modulo de criptografia
const crypto = require('crypto');

//Importa o arquivo de conexão
const connection = require('../database/connection');

module.exports = {
    //Função assincrona - listar | index ONG
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    //Função assincrona - cadastrar ONG
    async create (request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        //const data = request.body;    
        //console.log(data); 
        
        //cria uma id randomica 4Bytes 
        const id = crypto.randomBytes(4).toString('HEX');

        //AWAIT - Ao chegar nesse ponto ele vai aguardar esse código finalizar, pra só depois continuar
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        //retorna o resultado do SQL
        return response.json({id});
    }
};