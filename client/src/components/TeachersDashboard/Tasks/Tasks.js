import React, { useState, useEffect } from "react";
import "../../../styles/DashBoard/Tasks.css";
import apiService from "../../../utils/api";

function Tasks({ userRole }) {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    classLevel: "",
    fatherName: "",
    fatherOccupation: "",
    fatherMobile: "",
    aadhar: "",
    state: "",
    city: "",
    admissionYear: "2024-2025",
    applicationAmount: "500.00",
    photo: null,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiService.getStudents();
      setStudents(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setNewStudent({ ...newStudent, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStudentId) {
        await apiService.updateStudent(editStudentId, newStudent);
        alert("Student updated successfully.");
      } else {
        await apiService.addStudent(newStudent);
        alert("Student added successfully.");
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to Save the Student.");
    }
  };

  const resetForm = () => {
    setNewStudent({
      fullName: "",
      dob: "",
      age: "",
      gender: "",
      classLevel: "",
      fatherName: "",
      fatherOccupation: "",
      fatherMobile: "",
      aadhar: "",
      state: "",
      city: "",
      admissionYear: "2024-2025",
      applicationAmount: "500.00",
      photo: null,
    });
    setEditStudentId(null);
    setIsModalOpen(false);
  };

  const handleEditClick = (student) => {
    setNewStudent({
      fullName: student.fullName,
      dob: student.dob,
      age: student.age,
      gender: student.gender,
      classLevel: student.classLevel,
      fatherName: student.fatherName,
      fatherOccupation: student.fatherOccupation,
      fatherMobile: student.fatherMobile,
      aadhar: student.aadhar,
      state: student.state,
      city: student.city,
      admissionYear: student.admissionYear,
      applicationAmount: student.applicationAmount,
      photo: student.photo,
    });
    setEditStudentId(student._id);
    setIsModalOpen(true);
  };
  const handleDelete = async (studentId) => {
    try {
      await apiService.deleteStudent(studentId);
      alert("Student deleted successfully.");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };
  return (
    <div className="Container">
      <div>
       <h2>{userRole === "principal" ? "Prinicipal Account" : "Management Account"}</h2>
      </div>
      <div className="header">
        <h2 className="title">
          {userRole === "principal" ? "All Students" : "Students"}
          <span>({students.length})</span>
        </h2>
        {userRole !== "principal" && (
          <button
            className="open-modal-btn"
            onClick={() => setIsModalOpen(true)}>
            Student Admission
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>{editStudentId ? "Edit Student" : "Student Admission Form"}</h2>
            <form onSubmit={handleSubmit}>
              <h3>Personal Details</h3>
              <div className="form-group">
                <label>Student Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={newStudent.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter Student Name"
                />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={newStudent.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={newStudent.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select
                  name="gender"
                  value={newStudent.gender}
                  onChange={handleChange}
                  required
                  className="select-option">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Class:</label>
                <input
                  type="text"
                  name="classLevel"
                  value={newStudent.classLevel}
                  onChange={handleChange}
                  required
                  placeholder="Class Level"
                />
              </div>
              <div className="form-group">
                <label>Father Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={newStudent.fatherName}
                  onChange={handleChange}
                  required
                  placeholder="Father Name "
                />
              </div>
              <div className="form-group">
                <label>Father Occupation:</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={newStudent.fatherOccupation}
                  onChange={handleChange}
                  required
                  placeholder="Occupation"
                />
              </div>
              <div className="form-group">
                <label>Father Mobile:</label>
                <input
                  type="tel"
                  name="fatherMobile"
                  value={newStudent.fatherMobile}
                  onChange={handleChange}
                  required
                  placeholder="Mobile Number"
                />
              </div>
              <div className="form-group">
                <label>Aadhar Number:</label>
                <input
                  type="text"
                  name="aadhar"
                  value={newStudent.aadhar}
                  onChange={handleChange}
                  required
                  placeholder="Aadhar Number"
                  readOnly={!!editStudentId}
                />
              </div>
              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={newStudent.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={newStudent.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <label>Upload Passport Size Photo: Upto 10mb</label>
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  required={!editStudentId}
                />
                {newStudent.photo && (
                  <img
                    src={newStudent.photo}
                    alt="Preview"
                    className="photo-preview"
                  />
                )}
                {editStudentId && newStudent.photo === null && (
                  <img
                    src={`http://localhost:7995${newStudent.photo}`}
                    alt="Current"
                    className="photo-preview"
                  />
                )}
              </div>

              <h3>Fee Details</h3>
              <div className="form-group">
                <label>Admission Year:</label>
                <input type="text" value={newStudent.admissionYear} readOnly />
              </div>
              <div className="form-group">
                <label>Application Amount:</label>
                <input
                  type="text"
                  value={newStudent.applicationAmount}
                  readOnly
                />
              </div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editStudentId ? "Update" : "Submit and Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Photo</th>
              <th>Student Name</th>
              <th>DateOfBirth</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Father Name </th>
              <th>Father Occupation</th>
              <th>Father Mobile</th>
              <th>Aadhar</th>
              <th>State</th>
              <th>City</th>
              <th>Admission Year</th>
              <th>Application Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="16">No students have been added.</td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>
                    {student.photoPath ? (
                      <img
                        src={`http://localhost:7995${student.photoPath}`}
                        alt="avatar"
                        className="avatar"
                      />
                    ) : (
                      "No Photo"
                    )}
                  </td>
                  <td>{student.fullName}</td>
                  <td>{student.dob}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.classLevel}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.fatherOccupation}</td>
                  <td>{student.fatherMobile}</td>
                  <td>{student.aadhar}</td>
                  <td>{student.state}</td>
                  <td>{student.city}</td>
                  <td>{student.admissionYear}</td>
                  <td>₹ {student.applicationAmount}.00</td>
                  <td colSpan="3">
                  {userRole !== "principal" && (<button
                      className="Action-btn"
                      onClick={() => handleEditClick(student)}>
                      Update
                    </button>
                     )}
                    {userRole === "principal" && (
                      <button
                      className="Action-btn"
                      onClick={() => handleEditClick(student)}>
                      Update
                    </button> &&
                      <button
                        className="Action-btn"
                        onClick={() => handleDelete(student._id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
