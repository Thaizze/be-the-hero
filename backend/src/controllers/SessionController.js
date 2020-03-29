const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        
        //Pega a id do corpo
        const {id} = request.body;

        //Retorna apenas uma ONG
        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        //Se a Ong não existir - retorna o erro 400
        if(!ong){
            return response.status(400).json({ erro: 'Não foi encontrado nenhuma ONG com esse ID!' });
        }

        //Se existir - retorna os dados da ONG
        return response.json(ong);
    }
}