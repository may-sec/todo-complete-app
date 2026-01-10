const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db")
const cors = require("cors")
const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Create a new todo
app.post("/api/todos", async function(req, res){
    try {
        const createPayload = req.body;
        const parsedPayload = createTodo.safeParse(createPayload);
        
        if(!parsedPayload.success){
            return res.status(400).json({ 
                msg: "Invalid input",
                errors: parsedPayload.error.errors 
            });
        }

        const newTodo = await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        
        res.status(201).json({ 
            msg: "Todo created successfully",
            todo: newTodo 
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Get all todos
app.get("/api/todos", async function(req, res){
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Toggle todo completion status
app.patch("/api/todos/:id/toggle", async function(req, res){
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ msg: "Todo ID is required" });
        }
        
        const currentTodo = await todo.findById(id);
        
        if (!currentTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        
        console.log(`Toggling: ${currentTodo.title} - ${currentTodo.completed} -> ${!currentTodo.completed}`);
        
        const updatedTodo = await todo.findByIdAndUpdate(
            id,
            { completed: !currentTodo.completed },
            { new: true } // Return the updated document
        );
        
        res.json({ 
            msg: "Todo status toggled",
            todo: updatedTodo
        });
    } catch (error) {
        console.error("Error toggling todo:", error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ msg: "Invalid todo ID format" });
        }
        
        res.status(500).json({ msg: "Server error" });
    }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ msg: "Todo ID is required" });
        }
        
        const deletedTodo = await todo.findByIdAndDelete(id);
        
        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        
        res.json({ 
            msg: "Todo deleted successfully",
            todo: deletedTodo 
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ msg: "Invalid todo ID format" });
        }
        
        res.status(500).json({ msg: "Server error" });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

// Export for Vercel serverless
module.exports = app;