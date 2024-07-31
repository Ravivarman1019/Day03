import express from 'express';
import Mentor from '../Models/mendor.model';
import Student from '../Models/student.model';

const router = express.Router();

// Create Mentor
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const mentor = new Mentor({ name });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign Students to Mentor
router.post('/:mentorId/assign', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentIds } = req.body; // Assume an array of student IDs
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    await Student.updateMany(
      { _id: { $in: studentIds } },
      { mentor: mentorId }
    );
    mentor.students.push(...studentIds);
    await mentor.save();

    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.status(200).json(mentor.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
