require('dotenv').config();
const express = require('express')
const app = express();

const swaggerUi = require('swagger-ui-express');
const fs = require('fs')
const YAML = require('yaml')

const file  =  fs.readFileSync(process.cwd() + '/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, {customCss: CSS_URL}));

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