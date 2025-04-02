const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Obtener todas las tareas
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Obtener una tarea por ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
    console.log(`Eliminando tarea con ID: ${req.params.id}`);
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
