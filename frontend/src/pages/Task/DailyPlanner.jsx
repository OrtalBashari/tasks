import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const DailyPlanner = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [time, setTime] = useState("");
    const [day, setDay] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [showConfirmModel, setShowConfirmModel] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const navigate = useNavigate();



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

    const handleAddtask = (e) => {
        e.preventDefault();
        if (!newTask || !time)
            return;

        if (editingTaskId) {
            const updateTasks = tasks.map(task => 
                task.id ===editingTaskId
                ? {...task, title:newTask, time, day}
                : task

            );

            setTasks(updateTasks);
            setEditingTaskId(null);
        }
        else {
            const task = {
                id:Date.now(),
                title: newTask,
                time,
                day,
                completed: false
    
            };
            setTasks ([...tasks, task]);
        }

        setNewTask('');
        setTime('');
        setDay('');
    };

    const deleteTask = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task ?")
        if (confirmDelete) {
            const updateTasks = tasks.filter(task => task.id !== id);
            setTasks(updateTasks);
        }
    };

    const confirmDeleteTask = (task) => {
        setTaskToDelete(task);
        setShowConfirmModel(true);
    };

    const handleConfirmedDelete = () => {
        if (taskToDelete) {
            const updateTasks = tasks.filter(task => task.id !== taskToDelete.id);
            setTasks(updateTasks);
        }
        setShowConfirmModel(false);
        setTaskToDelete(null);


    };

    const startEditing = (task) => {
        setNewTask(task.title);
        setTime(task.time);
        setDay(task.day);
        setEditingTaskId(task.id);

    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map(task => 
                task.id === id ? {...task, completed: !task.completed } :task)
        );
    };

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



  return (
    <div className="p-8 ">

   


    <header className="fixed top-0 left-0 w-full bg-slate-100 text-white p-2 text-center z-10 shadow-lg">

      

    <h1 className="p-2 text-4xl font-bold mb-6 text-blue-700 flex justify-center bg-slate-100">
       Daily Planner</h1>
    
    <div className="flex justify-start mb-4">
  <button
    onClick={() => navigate('/')}
    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow"
  >
    ← Back to Home
  </button>
</div>
    
    </header>

    <div className="pt-40">

    <form onSubmit={handleAddtask} className="flex flex-col max-w-md mx-auto mb-10">
        <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="p-2 border rounded"
        required
        >
            <option value="">Select a Day</option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
        </select>

        <input 
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)} 
        className="p-2 border rounded mb-2"
        required

        />

        <input 
        type="text"
        placeholder='Add your task..'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="p-2 border rounded mb-2"
        required
        
        />

        <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {editingTaskId ? 'Update Task': 'Add Task'}
        </button>
    </form>
    </div>


    {/* List of the tasks */}
    <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-4">
          {daysOfWeek.map((dayName) => (
            <div key={dayName} className="bg-blue-50 p-4 rounded shadow-md min-w-[180px]">
              <h2 className="text-lg font-bold text-blue-700 mb-4">{dayName}</h2>
              {tasks
                .filter((task) => task.day === dayName)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((task) => (
                  <div key={task.id} className={`mb-3 p-2 rounded shadow-sm ${task.completed ? 'bg-green-100 text-gray-500 line-through' : 'bg-white'}`}>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>

                    <div className="flex justify-end gap-1 mt-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        {task.completed ? 'Undo' : 'Done'}
                      </button>
                      <button
                        onClick={() => confirmDeleteTask(task)}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setNewTask(task.title);
                          setTime(task.time);
                          setDay(task.day);
                          setEditingTaskId(task.id);
                        }}
                        className="text-xs bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>


      {showConfirmModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Are you sure you want to delete this task ?  
                </h3>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowConfirmModel(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded"
                        >


                    Cancel
                    </button>

                    <button onClick={handleConfirmedDelete}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
                    
                    >

                        Ok


                    </button>


                </div>



            </div>



        </div>
      )

      }
    </div>
  );
};

export default DailyPlanner;





