const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);
const port = process.env.port || 4000;

const server = express();

server.use(helmet());
server.use(express.json());

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
