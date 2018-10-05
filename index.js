const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const port = 8000;

const projectRoutes = require ('./projects/projectRoutes.js')
// const actionRoutes = require('./actions/actionRoutes.js')
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("combined"));

//Routes
server.get('/', (req, res) => {
  res.send('<h1>Welcome to Projects</h1>')
})

server.use('/api/projects', projectRoutes);

server.listen(port, () =>
console.log(`\n=== I am running the API on port ${port} ===\n`))