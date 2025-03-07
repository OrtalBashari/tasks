const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const tasksRoutes = require("./routes/tasks");
const usersRoutes = require("./routes/users");
const jwtRoutes = require("./routes/jwt");
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@task-manager.mxh1d.mongodb.net/?retryWrites=true&w=majority&appName=task-manager`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to the database once and keep it open
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Create database and collections
    const database = client.db("task-manager");
    global.usersCollection = database.collection("users");
    global.tasksCollection = database.collection("tasks");
    global.labelsCollection = database.collection("labels");
    global.notificationsCollection = database.collection("notifications");
    global.activityLogsCollection = database.collection("activity_logs");

  } catch (error) {
    console.error("🚨 MongoDB connection error:", error);
  }
}
connectDB();











app.use("/", tasksRoutes);
app.use("/", usersRoutes);
app.use("/", jwtRoutes);



app.get('/', (req, res) => {
  res.send('Hello World 2025!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
