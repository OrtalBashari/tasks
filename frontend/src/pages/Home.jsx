import React from 'react'
import { FaTasks, FaClock, FaCheckCircle } from "react-icons/fa";
const Home = () => {
  return (
    <div>
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-800 px-10 gap-x-0 h-screen ">
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

    <div className="flex justify-center text-black dark:text-white mt-4 font-bold text-3xl bg-blue-600  ">
      Manage your time easily and efficiently

      <div className="flex flex-wrap justify-center gap-6">

        
        
        </div>   




      </div>
    </div>

    




  )
}

export default Home