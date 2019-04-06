exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    tbl.increments(); // pass the name if you wanted to be called anything other than id
    tbl.string("name", 100).notNullable();
    tbl.string("description", 245).notNullable();
    tbl.string("notes", 245);
    tbl.boolean("complete");
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
