import { getStudentById, getAllStudents } from '../services/contacts.js';

export const getStudentByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(studentId)) {
    //   return res.status(400).json({ message: 'Invalid student id' });
    // }

    const student = await getStudentById(contactId);

    if (!student) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: student,
    });
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Contact not found' });
    }
    next(error);
  }
};

export const getAllStudentsController = async (req, res) => {
  const students = await getAllStudents();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: students,
  });
};
