import React, { useState, useEffect } from 'react';


const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('importantUrgent');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteModel, setShowDeleteModel] = useState(false); 



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

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTaskTitle(task.title);
  };
  
  const handleSaveEdit = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTaskTitle } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };
  
  const confirmDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModel(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      setTaskToDelete(null);
      setShowDeleteModel(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setShowDeleteModel(false);
  };

  const handleChangePriority = (taskId, newPriority) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, priority: newPriority} : task
    );
    setTasks(updatedTasks);
  };

  const renderTasks = (criteria) =>
    tasks
      .filter(task => task.priority === criteria)
      .map(task => (
        <div key={task.id} className="border p-2 rounded mb-2 flex justify-between items-center">
          {editingTaskId === task.id ? (
            <div className="flex w-full gap-2">
              <input
                value={editedTaskTitle}
                onChange={(e) => setEditedTaskTitle(e.target.value)}
                className="flex-grow p-1 border rounded"
              />
              <button
                onClick={() => handleSaveEdit(task.id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTaskId(null)}
                className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button 
              onClick={() => confirmDeleteTask(task)}
              className="text-sm text-red-600 hover:underline ml-2"
              >

              Delete
              </button>
            </div>
          ) : (
            <>
              <span>{task.title}</span>
              <button
                onClick={() => startEditing(task)}
                className="text-sm text-blue-600 hover:underline ml-2"
              >
                Edit
              </button>

              <button 
              onClick={() => confirmDeleteTask(task)}
              className="text-sm text-red-600 hover:underline ml-2"
              >

              Delete
              </button>
              <select 
              value={task.priority}
              onChange={(e) => handleChangePriority(task.id, e.target.value)}
              className="ml-2 border rounded p-1 text-sm"

              >
                  <option value="importantUrgent">Important & Urgent</option>
                  <option value="importantNotUrgent">Important & Not Urgent</option>
                  <option value="notImportantUrgent">Not Important & Urgent</option>
                  <option value="notImportantNotUrgent">Not Important & Not Urgent</option>

              </select>

             
            
            </>
            
          )}
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

      {showDeleteModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <p className="text-lg font-semibold"> Are you sure you want to delete this task ? </p>
            <div className="flex justify-center gap-4">
              <button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>

              <button
              onClick={handleCancelDelete}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

            </div>

          </div>



        </div>
      )

      }
    </div>
  );
};

export default EisenhowerMatrix;
