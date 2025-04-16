import React, { useState, useEffect } from 'react';


const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('importantUrgent');



    useEffect(() => {
          try {
              const savedTasks = localStorage.getItem("dailyTasks");
              if (savedTasks) {
                  setTasks(JSON.parse(savedTasks));
              }
          } catch (error) {
              console.error("Failed to parse saved tasks:", error);
              localStorage.removeItem("dailyTasks"); // מנקה את הבעיה
          }
      }, []);
      
  
  
      useEffect (() => {
          localStorage.setItem("dailyTasks", JSON.stringify(tasks));
      },
      [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = { id: Date.now(), title: newTask.trim(), priority };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderTasks = (criteria) =>
    tasks
      .filter(task => task.priority === criteria)
      .map(task => (
        <div
          key={task.id}
          className="border p-2 rounded mb-2 flex justify-between items-center bg-white shadow-sm"
        >
          <span>{task.title}</span>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      ));

  return (
    <div className="p-8">
      <header className="fixed top-0 left-0 w-full bg-slate-100 text-white p-4 text-center z-10 shadow-lg">

      <h1 className=" p-2 text-4xl font-bold mb-6 text-gray-800 text-center ">
        Eisenhower Matrix
      </h1>

      </header>

      <div className="pt-28">

      
    
      <form onSubmit={addTask} className="max-w-md mx-auto mb-8 space-y-3 ">
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="importantUrgent">Important & Urgent</option>
          <option value="importantNotUrgent">Important & Not Urgent</option>
          <option value="notImportantUrgent">Not Important & Urgent</option>
          <option value="notImportantNotUrgent">Not Important & Not Urgent</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Add Task
        </button>
      </form>
      </div>


      {/* Eisenhower Matrix */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-8 bg-red-100 rounded-lg">
          <h2 className="font-bold text-red-600 mb-2 text-lg">Important & Urgent</h2>
          {renderTasks('importantUrgent')}
        </div>

        <div className="p-8 bg-yellow-100 rounded-lg">
          <h2 className="font-bold text-yellow-400 mb-2 text-lg">Important & Not Urgent</h2>
          {renderTasks('importantNotUrgent')}
        </div>

        <div className="p-8 bg-blue-100 rounded-lg">
          <h2 className="font-bold text-blue-700 mb-2 text-lg">Not Important & Urgent</h2>
          {renderTasks('notImportantUrgent')}
        </div>

        <div className="p-8 bg-green-100 rounded-lg">
          <h2 className="font-bold text-green-600 mb-2 text-lg">Not Important & Not Urgent</h2>
          {renderTasks('notImportantNotUrgent')}
        </div>
      </div>
    </div>
  );
};

export default EisenhowerMatrix;
