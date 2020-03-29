//Importa o arquivo de conexão
const connection = require('../database/connection');

module.exports= {
    async index(request, response){
        //Procura por pages, se não existir page = 1
        const { page = 1 } = request.query;

        //Conta o total de  incidentes possui, e retorna apenas o primeiro resultado [count]
        const [count] = await connection('incidents').count();       

        //Limita a 5 registros por pagina | .join relaciona a ONG ao incidente
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city',
            'ongs.uf'
        ]);

        //Total de itens na lista
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    }, 
 
    async create(request, response){
        const { title, description, value } = request.body;

        //O nome authorization é o mesmo colocado no Insomnia
        const ong_id = request.headers.authorization;

        //Retorna ID
        const [id] = await connection ('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id});

        //cabeçalho - guarda informações do contexo da nossa requisição | dados da autentificação, localização, etc
        //request.headers;
    },

    async delete(request, response){
        //Pega o id que vem de dentro do Params
        const {id} = request.params;

        //Pega o id da Ong logada
        const ong_id = request.headers.authorization;

        //Verifica se o Incidente deletado é realmente da ONG logada, e retorna apenas o 1° registro
        //where o id buscado é o mesmo id que vai ser deletado
        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id') 
        .first();

        //Se o id da ONG logada, for diferente do id da ONG do incident apresenta o erro 401
        if(incident.ong_id != ong_id){
            //Não autorizado
            return response.status(401).json({ error: 'Operação não autorizada!'});
        }

        //Se estiver tudo Ok - deleta o incidente
        await connection('incidents').where('id', id).delete();

        //Retorna uma resposta de sucesso, porém sem conteúdo - sem corpo
        return response.status(204).send();
    }
};