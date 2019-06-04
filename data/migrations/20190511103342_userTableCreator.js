
exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl.string("name", 255).notNullable();
        tbl.string("email", 255).notNullable();
        tbl.integer("phoneNumber");
        tbl.boolean("premium");
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};