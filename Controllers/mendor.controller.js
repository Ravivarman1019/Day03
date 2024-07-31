import mendor from ('../Models/mendor.model.js')
import Student from ('../Models/student.model')

createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
};

assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).send('Mentor not found');

        const students = await Student.find({ _id: { $in: studentIds }, mentor: { $exists: false } });
        if (students.length !== studentIds.length) return res.status(400).send('Some students already have mentors');

        students.forEach(async student => {
            student.mentor = mentorId;
            await student.save();
        });

        mentor.students.push(...studentIds);
        await mentor.save();
        res.send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
};

getStudentsForMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id).populate('students');
        if (!mentor) return res.status(404).send('Mentor not found');
        res.send(mentor.students);
    } catch (error) {
        res.status(400).send(error);
    }
};
