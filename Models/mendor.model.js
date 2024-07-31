import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;
