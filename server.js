const express = require("express");

const app = express();

app.use(express.json());

// Store tasks in memory
let tasks = [];
let nextId = 1;


// ==========================================
// 1. HOME
// ==========================================

app.get("/", (req, res) => {
    res.send("Auriga AIR Practice API");
});


// ==========================================
// 2. CREATE TASK
// POST /tasks
// ==========================================

app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    // Validate title
    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const task = {
        id: nextId++,
        title: title,
        description: description || "",
        status: "pending"
    };

    tasks.push(task);

    res.status(201).json(task);
});


// ==========================================
// 3. GET ALL TASKS
// GET /tasks
// ==========================================

app.get("/tasks", (req, res) => {
    res.json(tasks);
});


// ==========================================
// 4. GET SINGLE TASK
// GET /tasks/:id
// ==========================================

app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});


// ==========================================
// 5. MARK TASK AS COMPLETED
// PUT /tasks/:id
// ==========================================

app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.status = "completed";

    res.json({
        message: "Task completed successfully",
        task: task
    });
});


// ==========================================
// 6. DELETE TASK
// DELETE /tasks/:id
// ==========================================

app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});


// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});