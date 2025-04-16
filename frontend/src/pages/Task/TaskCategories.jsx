import React, {useState} from 'react';

const TaskCategories = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('work');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask)
      return;
    const task = {id:Date.now(), title: newTask, category};
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const categories = ['Work', 'Study', 'Home', 'Fitness'];


  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-green-600 flex justify-center">Task Categories</h1>
      <form onSubmit={addTask} className="max-w-md mx-auto mb-8 space-y-2">
        <input 
        type="text" 
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="w-full p-2 border rounded"
        required
        />

        <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        >

          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"> 
          Add Task 
        </button>
      </form>


      <div>
        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 ">{cat}</h2>
            <div className="space-y-2">
              {tasks.filter(task => task.category === cat).map(task => (
                <div key={task.id} className="p-2 border rounded">
                  {task.title}
                  </div>
              )

              )}


            </div>



          </div>
         

        )

        )
        
        }
      </div>



      








      </div>
  );
};

export default TaskCategories;