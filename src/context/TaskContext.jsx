import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // lee localstorage para ver si hay tareas antiguas
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [darkMode, setDarkMode] = useState(false); 

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };


  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    // usamos ... para crear una copia y añadir la nueva
    setTasks([...tasks, { ...newTask, id: Date.now(), status: 'pending' }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus, darkMode, toggleTheme, searchQuery, setSearchQuery }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);