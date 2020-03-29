
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        //increments - cria um campo auto increment
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        //chave estrangeira    
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

//deleta as tabelas
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');  
};