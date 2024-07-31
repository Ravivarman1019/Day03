import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mentorRoutes from './routes/mentor.js';
import studentRoutes from './routes/student.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB', error));

export default app;
