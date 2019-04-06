const knex = require("knex");
const dbConfig = require("../../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getAction: function(id) {
    const query = db("actions as a");
    if (id) query.where("a.id", id).first();
    return query;
  },
  addAction: function(action) {
    if (action.name) {
      return db("actions")
        .insert(action)
        .then(ids => {
          id: ids[0];
          getAction(ids[0]);
        });
    } else {
      return "Error: needs name";
    }
  }
};
