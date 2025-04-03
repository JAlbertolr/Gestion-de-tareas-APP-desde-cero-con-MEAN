# Proyecto Full Stack MEAN (MongoDB, Express, Angular, Node.js)

Este proyecto Full Stack MEAN permite gestionar tareas a través de una API en Node.js con Express y MongoDB, y una interfaz de usuario en Angular.

## 🚀 Características principales
- Backend con **Node.js, Express y MongoDB**.
- Frontend en **Angular 19 con Standalone Components**.
- **API REST** para la gestión de tareas (CRUD).
- Uso de **HttpClient en Angular** para comunicarse con el backend.
- Implementación de **señales en Angular 19** para mejorar la reactividad.

---

## 🎨 Uso de la aplicación
### 📌 Añadir una nueva tarea
1. Introduce un **título** y una **descripción** (opcional).
2. Haz clic en el botón **Añadir**.
3. Si no se proporciona un título, se muestra un mensaje de error.

![Añadir tarea](https://github.com/user-attachments/assets/18c84d30-07cf-4b6b-8ff4-ce9e88be4b6d)

### 📌 Marcar tarea como completada
- Selecciona la opción **Marcar tarea completada** para moverla a la lista de tareas completadas.
- Puedes desmarcarla para devolverla a la lista de tareas pendientes.

![Marcar completada](https://github.com/user-attachments/assets/a0165fed-e8c6-4a22-8758-61b2a585f613)

### 📌 Eliminar tarea
1. Haz clic en el botón **Eliminar**.
2. Aparece un mensaje de confirmación con la opción **Eliminar** o **Cancelar**.

![Eliminar tarea](https://github.com/user-attachments/assets/ab0fa799-6034-4f16-a99a-1e4edb87ae45)

### 📌 Modificar tarea
1. Pulsa el botón **Modificar**.
2. Se mostrarán dos cuadros de texto para editar el título y la descripción.
3. Para guardar los cambios, pulsa **Actualizar**.
4. Si deseas cancelar la edición, presiona **Cancelar**.

![Modificar tarea](https://github.com/user-attachments/assets/5c222f09-143e-4069-aa97-520760e87e23)

---

## ⚙️ Configuración y ejecución

### 1️⃣ Backend: Servidor con Node.js y Express

#### 📌 Inicializar el proyecto
```bash
npm init -y
```

#### 📌 Instalar dependencias
```bash
npm install mongoose express dotenv cors nodemon
```

#### 📌 Configurar `package.json` para usar Nodemon
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

#### 📌 Configurar el servidor en `server.js`
```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
```

#### 📌 Ejecutar el backend
```bash
npm run dev
```

---

### 2️⃣ Frontend: Aplicación en Angular

#### 📌 Crear el proyecto Angular
```bash
ng new frontend --standalone --routing=true --style=css
cd frontend
```

#### 📌 Instalar dependencias
```bash
npm install @angular/material @angular/forms @angular/common @angular/common/http
```

#### 📌 Crear componentes standalone
```bash
ng generate component components/task-list --standalone
ng generate component components/task-form --standalone
```

#### 📌 Crear el servicio para manejar las tareas
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

#### 📌 Ejecutar el frontend
```bash
ng serve
```

---

## 📌 Conclusión
Este proyecto implementa un sistema de gestión de tareas usando **MEAN Stack** con **Angular 19**. Proporciona un backend en **Express con MongoDB** y un frontend en **Angular con componentes standalone y servicios**. 🚀

## 🛠️ Tecnologías utilizadas
- **MongoDB** (Base de datos)
- **Express.js** (Framework backend en Node.js)
- **Angular 19** (Frontend con Standalone Components)
- **Node.js** (Entorno de ejecución de JavaScript)
- **HttpClient y señales en Angular** para mejorar la reactividad.

---

## ✨ Autor
📌 Creado por **Juan Alberto** 😊


