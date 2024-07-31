import studentModel from '../Models/student.model.js';
import mendorModel from '../Models/mendor.model.js';


createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

assignOrChangeMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).send('Student not found');

        if (student.mentor) {
            student.previousMentors.push(student.mentor);
        }

        student.mentor = mentorId;
        await student.save();

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).send('Mentor not found');

        mentor.students.push(studentId);
        await mentor.save();

        res.send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

getPreviousMentorsForStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('previousMentors');
        if (!student) return res.status(404).send('Student not found');
        res.send(student.previousMentors);
    } catch (error) {
        res.status(400).send(error);
    }
};
