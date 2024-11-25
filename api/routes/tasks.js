const { sql } = require('@vercel/postgres');
const express = require('express')
const router = express.Router();

//const tasks = [{ id: 1, name: 'Task 1', isDone: false }, { id: 2, name: 'Task 2', isDone: false }];
//let taskId = tasks.length;

// http://localhost:4000/tasks
router.get('/', async (req, res) => {
    if (req.query) {
        if (req.query.id) {
            // http://localhost:4000/tasks?id=1
            const task = await sql`SELECT * FROM Tasks WHERE Id = ${req.query.id};`;
            if (task.rowCount > 0) {
                res.json(task.rows[0]);
            } else {
                res.status(404).json();
            }
            return;
        }
    }

    const tasks = await sql`SELECT * FROM Tasks ORDER BY Id;`;
    res.json(tasks.rows);
});

// http://localhost:4000/tasks/1
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await sql`SELECT * FROM Tasks WHERE Id = ${id};`;

    if (task.rowCount > 0) {
        res.json(task.rows[0]);
    } else {
        res.status(404).json();
    }
});

// http://localhost:4000/tasks - { "name": "New Task" }
router.post('/', async (req, res) => {
    await sql`INSERT INTO Tasks (Name) VALUES (${req.body.name});`;
    res.status(201).json();
});

//http://localhost:4000/tasks/1 - { "name": "Task 1 Updated", "isDone": true } | { "name": "Task 1 Updated" } | { "isDone": true }
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const taskUpdate = await sql`UPDATE Tasks SET Name = ${
        (req.body.name != undefined ? req.body.name : task.name)
    }, IsDone = ${
        (req.body.isDone != undefined ? req.body.isDone : task.isDone)
    } WHERE Id = ${id};`;

    if (taskUpdate.rowCount > 0) {
        const task = await sql`SELECT * FROM Tasks WHERE Id = ${id};`;
        res.status(200).json(task.rows[0]);
    } else {
        res.status(404).json();
    }
});

// http://localhost:4000/tasks/1
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await sql`DELETE FROM Tasks WHERE Id = ${id};`;

    if (task.rowCount > 0) {
        res.status(204).json();
    } else {
        res.status(404).json();
    }
});

module.exports = router;