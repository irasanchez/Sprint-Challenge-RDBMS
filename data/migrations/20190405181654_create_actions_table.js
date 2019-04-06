exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    tbl.increments();
    tbl.string("name", 100).notNullable();
    tbl.text("description", 245).notNullable();
    tbl.text("notes", 245);
    tbl
      .boolean("complete")
      .defaultTo(false)
      .notNullable();
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable();
    tbl
      .foreign("project_id")
      .references("id")
      .inTable("projects");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
