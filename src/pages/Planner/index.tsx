import { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  date: Date;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const categories = ['Estudos',
  'Exercícios',
  'Revisão',
  'Leitura',
  'Prática',
  'Outros',
];

import { useAuth } from '../../hooks/useAuth';

export function Planner() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [category, setCategory] = useState(categories[0]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleAddTask = () => {
    setShowModal(true);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleCreateTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(
        '/api/tasks',
        {
          title: newTask,
          priority: priority,
          category: category,
        },
        {
          baseURL: 'http://localhost:5000',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...response.data, id: response.data._id },
      ]);
      setNewTask('');
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      await axios.patch(
        `/api/tasks/${taskId}`,
        { completed },
        {
          baseURL: 'http://localhost:5000',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: completed } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };

  const handleDeleteSelectedTasks = async () => {
    try {
      await axios.delete('/api/tasks/selected', {
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { taskIds: selectedTasks },
      });
      setTasks((prevTasks) =>
        prevTasks.filter((task) => !selectedTasks.includes(task._id))
      );
      setSelectedTasks([]);
    } catch (error) {
      console.error('Erro ao excluir tarefas selecionadas:', error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete('/api/tasks', {
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks([]);
      setSelectedTasks([]);
    } catch (error) {
      console.error('Erro ao excluir todas as tarefas:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>Planner</h1>
      <p>Organize suas atividades e mantenha o foco nos seus objetivos</p>

      {/* Input de Nova Tarefa */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Adicionar nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px 15px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Adicionar
        </button>
      </div>

      {/* Lista de Tarefas */}
      <div style={{ marginTop: '20px' }}>
        <div>
          <button
            onClick={handleDeleteSelectedTasks}
            disabled={selectedTasks.length === 0}
            style={{
              background: 'red',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Excluir Selecionadas
          </button>
          <button
            onClick={handleDeleteAllTasks}
            style={{
              background: 'red',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Excluir Todas
          </button>
        </div>
        {tasks.length === 0 ? (
          <p>Você ainda não tem tarefas.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task._id)}
                  onChange={() => handleSelectTask(task._id)}
                  style={{ color: '#000', cursor: 'pointer' }}
                />
                <hr style={{rotate: '90deg', width: '20px'}} />
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => toggleTaskCompletion(task._id, e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <div>
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.title}
                  </span>
                  <div>
                    <span
                      style={{
                        background: getPriorityColor(task.priority),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        marginRight: '5px',
                      }}
                    >
                      {task.priority}
                    </span>
                    <span
                      style={{
                        background: '#ddd',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    >
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(`/api/tasks/${task._id}`, {
                      baseURL: 'http://localhost:5000',
                      withCredentials: true,
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    setTasks(tasks.filter((t) => t._id !== task._id));
                  } catch (error) {
                    console.error('Erro ao excluir tarefa:', error);
                  }
                }}
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal de Adicionar Tarefa */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
            }}
          >
            <h2>Adicionar Detalhes da Tarefa</h2>
            <label>Prioridade</label>
            <select
              style={{ width: '100%', padding: '8px' }}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
            >
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
            <label>Categoria</label>
            <select
              style={{ width: '100%', padding: '8px' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={handleCreateTask}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resumo do Dia */}
      <div
        style={{
          marginTop: '30px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <h3>Resumo do Dia</h3>
        <p>Total de Tarefas: {tasks.length}</p>
        <p>Concluídas: {tasks.filter((task) => task.completed).length}</p>
        <p>Pendentes: {tasks.filter((task) => !task.completed).length}</p>
      </div>

      {/* Categorias */}
      <div
        style={{
          marginTop: '30px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <h3>Categorias</h3>
        {categories.map((category) => (
          <div
            key={category}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 0',
            }}
          >
            <span>{category}</span>
            <span>
              {tasks.filter((task) => task.category === category).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
