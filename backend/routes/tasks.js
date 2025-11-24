import express from 'express';
import Task from '../models/Task.js';
import { authMiddleware } from '../middleware/authMiddleware.js';  // Protect routes with authentication

const router = express.Router();

// Create task
// router.post('/tasks', authMiddleware, async (req, res) => {
//   const { title, description, dueDate } = req.body;
//   try {
//     const newTask = new Task({
//       title,
//       description,
//       dueDate,
//       userId: req.user._id,  // Attach the logged-in user's ID
//     });
//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating task', error: err.message });
//   }
// });

router.post('/tasks', authMiddleware, async (req, res) => {
  const { title, description, dueDate } = req.body;
  console.log('Create Task Input:', req.body);
  console.log('Authenticated user:', req.user);

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      userId: req.user._id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Task creation failed:', err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});


// Get tasks for a user
router.get('/tasks', authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalTasks = await Task.countDocuments({userId: req.user._id}); // for frontend and count total tasks for pagination metadata

    const tasks = await Task.find({ userId: req.user._id })
                            .skip(skip)
                            .limit(limit);
     
    const totalPages = Math.ceil(totalTasks / limit);                        

    res.json({currentPage: page, totalPages: totalPages, totalTasks: totalTasks, tasks: tasks});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

// Update task
router.put('/tasks/:id', authMiddleware, async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete task
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

export default router;