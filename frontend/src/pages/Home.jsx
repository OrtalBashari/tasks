import React from 'react'
import { FaTasks, FaClock, FaCheckCircle, FaListAlt, FaEdit, FaCheckSquare, FaGlobe, FaMobileAlt, FaLaptop } from "react-icons/fa";
const Home = () => {
  return (
    <div>
    <div className="flex items-center justify-center bg-white dark:bg-gray-800 px-10 gap-x-0 h-screen ">
      <div className="w-1/3 text-right pr-4 ">

      <h1 className="text-4xl font-bold text-black dark:text-white leading-tight">
      Plan your day, boost productivity, and get  
      things done effortlessly
      </h1> 


      </div>

      <div className="w-2/5 flex justify-center">
      <img src="/home.png" alt='Task Managment' className="w-3/4 rounded-2xl shadow-2xl brightness-105 hover:scale-105"> 
      </img>

      </div>
      
      
    </div>

    <div className="text-center mb-11 text-black dark:text-white mt-4 font-bold text-3xl">
      Manage your time easily and efficiently

      <div className="flex flex-wrap justify-center gap-6 mt-10">


      {/*Card 1 */}
        <div className="dark:bg-gray-700 p-6 rounded-lg shadow-lg w-64 text-center hover:scale-105 transition bg-white">
          <FaTasks className="text-4xl text-blue-500 mx-auto mb-4"/>
          <h3 className="text-lg font-bold text-gray-600 dark:text-white">
          Manage Your Tasks </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          Stay Organized with Task Lists That Work for You
          </p>

          



        </div>


      {/*Card 2 */}
        <div className="dark:bg-gray-700 p-6 rounded-lg shadow-lg w-64 text-center hover:scale-105 transition bg-white">
          <FaCheckSquare  className="text-4xl text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-600 dark:text-white">
          Mark Completed Tasks
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          Check off completed tasks and enjoy the satisfaction of progress

          </p>
          
          </div>

      {/*Card 3 */} 
      <div className="dark:bg-gray-700 p-6 rounded-lg shadow-lg w-64 text-center hover:scale-105 transition bg-white">
      <div className="flex justify-center space-x-4 mb-4"> 
        <FaMobileAlt className="text-4xl text-[#070707] dark:text-white" />
        <FaLaptop className="text-4xl text-[#142861ec] dark:text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-600 dark:text-white">
      Easy to use
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        Access your tasks anywhere, anytime on any device
      </p>
    </div>


        
        </div>  

        




      </div>
    </div>

    




  )
}

export default Home;