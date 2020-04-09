const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    "id": "09d4bf1c-a916-475d-b287-431cf478001f",
    "url": "https://github.com/Rocketseat/umbriel",
    "title": "Umbriel",
    "techs": [
      "Node",
      "Express",
      "TypeScript"
    ],
    "likes": 0
  }
];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { url, title, techs } = req.body;
  const id = uuid();

  const newRepo = {
    id, 
    url,
    title,
    techs,
    likes: 0,
   };

  repositories.push(newRepo);

  return res.json( newRepo );
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;

  let repoIndex = -1;

  const repository = repositories.find((repo, index) => {
    if (!(repo.id === id)) {
      return;
    }
    
    repoIndex = index;

    return repo;
  }); 

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories[repoIndex] = {
    ...repository,
    ...req.body,
    likes: repository.likes,
  };

  return res.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

 const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).json();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  let repoIndex = -1;

  const repository = repositories.find((repo, index) => {
    if (!(repo.id === id)) {
      return;
    }

    repoIndex = index;

    return repo;
  });

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories[repoIndex] = {
    ...repository,
    likes: repository.likes + 1,
  }

  return res.json(repositories[repoIndex]);
});

module.exports = app;
