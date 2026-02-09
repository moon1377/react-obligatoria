import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useForm } from '../hooks/useForm';

const TaskForm = ({ userName }) => {
  const { addTask } = useTasks();

  // inicia el formulario con valores por defecto usando el hook personalizado
  const { values, handleChange, resetForm } = useForm({
    title: '',
    description: '',
    priority: 'Media'
  });

  // maneja el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); //previene recarga de pagina
    if (!values.title) return;

    // agrega la tarea al contexto, incluyendo el autor
    addTask({
        ...values,
        author: userName 
    });

    resetForm();
  };

  return (

    //formulario con estilos inline
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Nueva Tarea</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Título de la tarea"
          required
        />
        
        <select name="priority" value={values.priority} onChange={handleChange}>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Descripción (opcional)"
        rows="3"
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button type="submit">Añadir Tarea</button>
    </form>
  );
};

export default TaskForm;