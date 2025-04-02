const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 🟢 POST: Add a new task
router.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, due_date } = req.body;
        const newTask = new Task({ title, description, status, due_date });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error });
    }
});

// 🔵 GET: Fetch all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// 🟡 PUT: Update task details
router.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});

// 🔴 DELETE: Remove a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

module.exports = router;
