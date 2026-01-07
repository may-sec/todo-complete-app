const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db")
const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({ msg: "Inserted wrong input" })
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({ msg: "Todo created - mongo" })
});

app.get("/todos", async function(req, res){
    const todos = await todo.find({});
    res.json({ todos })
});

app.put("/completed", async function(req, res){
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload)
    if(!parsePayload.success){
        res.status(411).json({ msg: "Inserted wrong input" })
        return;
    }
    
    try {
        const currentTodo = await todo.findById(req.body.id);
        
        if (!currentTodo) {
            res.status(404).json({ msg: "Todo not found" })
            return;
        }
        
        console.log(`Status for (((${currentTodo.title} ----- ${currentTodo.description}))) [[[${currentTodo.completed} ----> ${!currentTodo.completed}]]]`);
        
        // Toggle the completed status
        await todo.updateOne(
            { _id: req.body.id }, 
            { completed: !currentTodo.completed }
        )
        
        res.json({ 
            msg: "Todo status toggled",
            newStatus: !currentTodo.completed 
        })
    } catch (error) {
        console.error("Error toggling todo:", error);
        res.status(500).json({ msg: "Server error" })
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