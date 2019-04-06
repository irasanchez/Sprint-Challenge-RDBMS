const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const projectHelpers = require("./data/helpers/projectHelpers");
const actionHelpers = require("./data/helpers/actionHelpers");
const db = knex(dbConfig.development);
const port = process.env.port || 4000;

const server = express();

server.use(helmet());
server.use(express.json());

//endpoints start

//projects
server.post("/api/projects", async (req, res) => {
  try {
    const project = req.body;
    const addedProject = await projectHelpers.addProject(project);
    res.status(200).json(addedProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get("/api/projects", async (req, res) => {
  try {
    const projects = await projectHelpers.getProject();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/api/projects/:id", (req, res) => {
  try {
    const { id } = req.params;

    projectHelpers.getProject(id).then(project => {
      if (project) {
        db("actions")
          .where("actions.project_id", id)
          .then(actions => {
            project.actions = actions;
            res.status(200).json(project);
          });
      }
    });
  } catch (error) {
    error => res.status(500).json(error);
  }
});

//actions
server.post("/api/actions", async (req, res) => {
  try {
    const action = req.body;
    const addedAction = await actionHelpers.addAction(action);

    res.status(200).json(addedAction);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get("/api/actions", async (req, res) => {
  try {
    const actions = await actionHelpers.getAction();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//endpoints end

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
