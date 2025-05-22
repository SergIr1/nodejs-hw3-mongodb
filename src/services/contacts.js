import { StudentCollections } from '../models/contact.js';

export const getAllStudents = async () => {
  const students = await StudentCollections.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentCollections.findById(studentId);
  return student;
};
