import express from 'express';
import student from '../Models/student.model'

const router = express.Router();

// Create Student
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const student = new Student({ name });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign or Change Mentor for a particular Student
router.post('/:studentId/assign-mentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.mentor = mentorId;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get previously assigned mentor for a student
router.get('/:studentId/previous-mentors', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json(student.mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
