require('dotenv').config();
const express = require('express')
const app = express();

const swaggerUi = require('swagger-ui-express');
const fs = require('fs')
const YAML = require('yaml')

const file  = fs.readFileSync('./api/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// enable middleware to parse body of Content-type: application/json
app.use(express.json());

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

// tasks
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

module.exports = app;