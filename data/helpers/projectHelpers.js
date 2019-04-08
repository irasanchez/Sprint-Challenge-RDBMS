const knex = require("knex");
const dbConfig = require("../../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getProject: function(id) {
    const query = db("projects");

    if (id) {
      query.where("id", id).first();
      return query;
    }
    return query;
  },
  addProject: function(project) {
    return db("projects")
      .insert(project)
      .then(([id]) => this.getProject(id));
  }
};
