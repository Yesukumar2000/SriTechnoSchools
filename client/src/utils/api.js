import axios from "axios";

const apiService = {
  login: async (credentials) => {
    const response = await axios.post("http://localhost:7995/api/login", credentials);
    return response.data;
  },
  register: async (credentials) => {
    const response = await axios.post("http://localhost:7995/api/register", credentials);
    return response.data;
  },
  getStudents: async () => {
    const response = await axios.get("http://localhost:7995/api/students");
    console.log(response.data);
    return response.data;
  },
  addStudent: async (studentData) => {
    const response = await axios.post("http://localhost:7995/api/students", studentData);
    return response.data;
  },
  updateStudent: async (studentId, updatedData) => {
    const response = await axios.put(`http://localhost:7995/api/students/${studentId}`, updatedData);
    return response.data;
  },
  deleteStudent: async (studentId) => {
    const response = await axios.delete(`http://localhost:7995/api/students/${studentId}`);
    return response.data;
  },

};

export default apiService;
