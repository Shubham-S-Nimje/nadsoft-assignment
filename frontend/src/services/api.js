import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const studentAPI = {
  // Get all students
  getAllStudents: (page = 1, limit = 10) => {
    return api.get(`/students?page=${page}&limit=${limit}`);
  },

  // get student by id
  getStudentById: (id) => {
    return api.get(`/students/${id}`);
  },

  // create student
  createStudent: (studentData) => {
    return api.post("/students", studentData);
  },

  // update student
  updateStudent: (id, studentData) => {
    return api.put(`/students/${id}`, studentData);
  },

  // delete student
  deleteStudent: (id) => {
    return api.delete(`/students/${id}`);
  },
};

export default api;
