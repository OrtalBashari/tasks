import React, { useState } from 'react';
import { FaCalendarCheck, FaChartLine, FaTasks } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TaskManagementOptions = () => {
  const [activeTab, setActiveTab] = useState('dailyPlanner');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-center mb-11 text-black dark:text-white mt-4 font-bold text-3xl">
      <h2>בחר את אופציית ניהול המשימות שלך</h2>

      {/* Tabs */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => handleTabChange('dailyPlanner')} 
          className={`px-6 py-2 font-bold ${activeTab === 'dailyPlanner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          תכנון יומי
        </button>
        <button 
          onClick={() => handleTabChange('habitTracker')} 
          className={`px-6 py-2 font-bold ${activeTab === 'habitTracker' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          מעקב הרגלים
        </button>
        <button 
          onClick={() => handleTabChange('eisenhowerMatrix')} 
          className={`px-6 py-2 font-bold ${activeTab === 'eisenhowerMatrix' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          מטריצת Eisenhower
        </button>
      </div>

      {/* Tabs Content */}
      <div className="mt-10">
        {activeTab === 'dailyPlanner' && (
          <div className="p-6 rounded-lg shadow-lg max-w-sm text-center bg-white dark:bg-gray-700">
            <FaCalendarCheck className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-white">תכנון יומי</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
              ארגן את היום שלך עם משימות יומיות מסודרות
            </p>
            <button 
              onClick={() => navigate('/daily-planner')} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              התחלת תכנון
            </button>
          </div>
        )}

        {activeTab === 'habitTracker' && (
          <div className="p-6 rounded-lg shadow-lg max-w-sm text-center bg-white dark:bg-gray-700">
            <FaChartLine className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-white">מעקב הרגלים</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
              פתח הרגלים חיוביים ושמור על עקביות
            </p>
            <button 
              onClick={() => navigate('/habit-tracker')} 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              התחל מעקב
            </button>
          </div>
        )}

        {activeTab === 'eisenhowerMatrix' && (
          <div className="p-6 rounded-lg shadow-lg max-w-sm text-center bg-white dark:bg-gray-700">
            <FaTasks className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-white">מטריצת Eisenhower</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
              קבע סדרי עדיפויות והיה יעיל יותר
            </p>
            <button 
              onClick={() => navigate('/eisenhower-matrix')} 
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              תעדוף משימות
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementOptions;
