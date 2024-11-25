require('dotenv').config();
const { sql } = require('@vercel/postgres');
const express = require('express')
const app = express();

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