import express from "express";
import cors from "cors";
import fs from "fs";
import process from "process";

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = "./database.json";

// Leer toda la base de datos
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

// Escribir toda la base de datos
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// 📌 GET /tasks - Obtener todas las tareas
app.get("/tasks", (req, res) => {
  const data = readDB();
  res.json(data.tasks || []);
});

// 📌 POST /tasks - Crear una tarea
app.post("/tasks", (req, res) => {
  const data = readDB();
  const newTask = req.body;
  
  if (!data.tasks) data.tasks = [];
  data.tasks.push(newTask);
  
  writeDB(data);
  res.json({ ok: true, task: newTask });
});

// 📌 PUT /tasks/:id - Actualizar una tarea
app.put("/tasks/:id", (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  
  const index = data.tasks.findIndex(t => t.id === id);
  
  if (index !== -1) {
    data.tasks[index] = updatedTask;
    writeDB(data);
    res.json({ ok: true, task: updatedTask });
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

// 📌 DELETE /tasks/:id - Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);
  
  data.tasks = data.tasks.filter(t => t.id !== id);
  
  writeDB(data);
  res.json({ ok: true });
});

// 📌 GET /users - Para login
app.get("/users", (req, res) => {
  const data = readDB();
  const { username, password } = req.query;
  
  const user = data.users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json([user]); // json-server devuelve un array
  } else {
    res.json([]);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));