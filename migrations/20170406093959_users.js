
exports.up = function(knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl.string('username', 100).notNullable().unique();
    tbl.string('hashed_password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
