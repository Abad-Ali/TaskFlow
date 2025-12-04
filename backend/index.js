import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
// import profileRoutes from './routes/profile.js';

dotenv.config();

const app = express();

// CORS CONFIG
const corsOptions = {
  origin: ['http://localhost:3000', 'https://taskflow-blush-two.vercel.app'], // your frontend
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
// app.use('/api/profile', profileRoutes);

// START SERVER
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

startServer();
