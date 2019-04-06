exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(tbl) {
    tbl.increments(); // pass the name if you wanted to be called anything other than id
    //name
    tbl
      .string("name", 255)
      .notNullable()
      .unique("uq_project_name");
    //description
    tbl.string("description").notNullable();
    //complete
    tbl.boolean("complete");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
