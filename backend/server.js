require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/appFullStackMEAN/tasks', taskRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
