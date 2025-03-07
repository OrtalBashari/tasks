const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();



// Create a new task
router.post('/new-task', async (req, res) => {
    try {
      const newTask = req.body;
      console.log("📌 New Task:", newTask);
      const result = await global.tasksCollection.insertOne(newTask);
      res.send(result);
    } catch (error) {
      console.error("🚨 Error inserting task:", error);
      res.status(500).send({ message: "Failed to add task" });
    }
  });

// Get all the tasks 
router.get("/tasks", async (req, res) => {
    try {
      const tasks = await global.tasksCollection.find().toArray();
      res.send(tasks);
    } catch (error) {
      console.error("🚨 Error fetching tasks:", error);
      res.status(500).send({ message: "Failed to fetch tasks" });
    }
  });
  

// Update the status and title.
router.patch('/change-task/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const title = req.body.title;
  const filter = {_id: new ObjectId(id)};
  const options = {upsert: true };
  const updateDoc = {
    $set: {
      status: status,
      title: title
    },
  };
  const result = await global.tasksCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});

//update the all data
router.put('/update-task/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateTask = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({message: "Invalid Task ID"});
    }

    const filter = {_id: new ObjectId(id)};
    const options = {upsert: false };
    const updateDoc = {$set: updateTask};

    const result = await global.tasksCollection.updateOne(filter, updateDoc, options);

    if (result === 0) {
      return res.status(404).send({message: "Task not found."});
    }
    res.send({message: "Task updated successfully", result});
  }

  catch (error) {
    console.error("error updating task :", error);
    res.status(500).send({message: "Failed to update task"});
  }
});



module.exports = router;

