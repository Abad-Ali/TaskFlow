'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setError('No tasks found.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      setError('No token found, please login again.');
      setLoading(false);
      router.push('/login'); // Redirect if not authenticated
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token
    router.push('/login');             // Redirect to login page
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5000/api/tasks/${editId}`
      : 'http://localhost:5000/api/tasks';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save task');

      await fetchTasks();
      setForm({ title: '', description: '', dueDate: '' });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete task');
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.slice(0, 10),
    });
    setEditId(task._id);
    setIsEditing(true);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col gap-12'>

      <div className="form w-full flex justify-center">
        <div className="backdrop-blur-md bg-slate-950/20 w-full max-w-2xl px-6 sm:px-10 py-10 rounded-2xl border border-white m-4 transition-transform transform hover:scale-105">
          <form className="flex flex-col gap-5 justify-between items-center w-full" onSubmit={handleSubmit} >
            <h2 className="text-2xl font-black font-serif mb-3 text-white text-center">Add your New Task</h2>
            <input className="bg-white px-4 py-3 w-full font-bold font-serif rounded-3xl focus:outline-blue-700 text-black" name="title" placeholder="Enter your Task" value={form.title} onChange={handleChange} required />
            <input className="bg-white px-4 py-3 w-full font-bold font-serif rounded-3xl focus:outline-blue-700 text-black" name="description" placeholder="Enter the Description of your task" value={form.description} onChange={handleChange} />
            <input className="bg-white px-4 py-3 w-full font-bold font-serif rounded-3xl focus:outline-blue-700 text-black" type="date"  name="dueDate" value={form.dueDate} onChange={handleChange} required />
    
            <button type="submit" className="text-xl text-blue-700 font-bold bg-[#121212] px-7 py-2 rounded-xl hover:bg-blue-700 hover:text-white border hover:border-gray-300 hover: cursor-pointer transition" >
              {isEditing ? 'Update' : 'Add'} Task
            </button>
    
            {isEditing && (
              <button type="button" 
              onClick={() => {
                  setIsEditing(false);
                  setForm({ title: '', description: '', dueDate: '' });
                }}>
                <span className="hover:text-red-500 hover:cursor-pointer font-semibold font-serif">Cancel</span>
              </button>
            )}
          </form>
        </div>
      </div>

      <div className='flex justify-between items-center px-7'>
        <h1 className='text-2xl font-black font-serif'>Your Tasks</h1>
        <button className='text-[1.15rem] text-white font-bold bg-[#121212] px-4 py-2 rounded-xl border border-transparent transition-all duration-200 hover:bg-gray-100/10 hover:border-gray-300 cursor-pointer' onClick={handleLogout}>Logout</button>
      </div>

      <div className='flex justify-center'><div className='bg-gray-500 pt-[0.5px] w-[85%]'></div></div>

      <div className=" w-full pb-7">
        {tasks.length === 0 ? (
          <p className="text-xl text-slate-300 text-center">No tasks found ...</p>
        ) : (
          <ul className="flex flex-wrap gap-4 justify-center">
            {tasks.map((task) => (
              <li key={task._id} className="flex flex-col justify-between backdrop-blur-md bg-slate-950/20 border-[1] border-gray-200 text-white p-4 rounded-xl shadow-md w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2"><span className='font-bold font-serif'>Your task:</span> {task.title}</h3>
                <p className="text-lg font-semibold mb-2"><span className='font-bold font-serif'>Task description:</span> {task.description}</p>
                <p className="mb-4 text-sm text-gray-300">Due date: {new Date(task.dueDate).toLocaleDateString()}</p>

                <div className="flex justify-between">
                  <button className="text-lg text-blue-700 hover:text-blue-700 font-bold bg-blue-700/10 px-3 py-1 rounded-xl hover:cursor-pointer hover:bg-[#121212] border   hover:border-blue-700 transition" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button className="text-lg text-red-600 hover:text-red-500 font-bold bg-red-600/10 px-3 py-1 rounded-xl hover:cursor-pointer hover:bg-[#121212] border   hover:border-red-500 transition" onClick={() => handleDelete(task._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Tasks;