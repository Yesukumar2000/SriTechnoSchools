const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7995;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Ensure 'uploads' directory 
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Database Connection
const connectToMongoDB = async () => {
  const MongoDBUrl = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MongoDBUrl);
    console.log("Successfully Connected To MongoDB");
  } catch (error) {
    console.error("Unable to connect to MongoDB", error);
  }
};

// Mongoose Models
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true } 
});

const User = mongoose.model('User', UserSchema);

// Mongoose Models
const StudentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dob: { type: String},
    age: { type: Number},
    gender: { type: String },
    classLevel: { type: String, required: true },
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherMobile: { type: String },
    aadhar: { type: String, required: true, unique: true },
    state: { type: String },
    city: { type: String },
    admissionYear: { type: String},
    applicationAmount: { type: Number },
    photoPath: { type: String }
});

const Student = mongoose.model('Student', StudentSchema);

// Registration Route
app.post('/api/register', async (req, res) => {
    const { email, password, userType } = req.body; 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, userType }); 
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully." });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
});


// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password, userType } = req.body;
  
    try {
      const user = await User.findOne({ email, userType }); 
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid  Password' });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Server error during login' });
    }
});
  

// Route to add a student
app.post('/api/students', async (req, res) => {
    const studentData = req.body;

    try {
        // Check for duplicate Aadhar
        const existingStudent = await Student.findOne({ aadhar: studentData.aadhar });
        if (existingStudent) {
            return res.status(400).json({ message: "A student with this Aadhar number already exists." });
        }

        // Handle photo upload
        let photoPath = null;
        if (studentData.photo && studentData.photo.startsWith("data:image")) {
            const base64Data = studentData.photo.replace(/^data:image\/\w+;base64,/, "");
            const fileName = `${Date.now()}-photo.jpg`;
            const filePath = path.join(__dirname, 'uploads', fileName);
            fs.writeFileSync(filePath, base64Data, 'base64');
            photoPath = `/uploads/${fileName}`;
        }

        // Create and save the new student
        const newStudent = new Student({ ...studentData, photoPath });
        await newStudent.save();
        res.status(201).json({ message: "Student data saved successfully." });
    } catch (error) {
        console.error("Error saving student data:", error);
        res.status(500).json({ message: "Error saving student data", error: error.message });
    }
});

//Route to get all students
app.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find({});
      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Error fetching students" });
    }
  });
  
// Route to update a student's 
app.put('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        let photoPath = student.photoPath; 
        if (updatedData.photo && updatedData.photo.startsWith("data:image")) {
            const base64Data = updatedData.photo.replace(/^data:image\/\w+;base64,/, "");
            const fileName = `${Date.now()}-photo.jpg`;
            const filePath = path.join(__dirname, 'uploads', fileName);
            fs.writeFileSync(filePath, base64Data, 'base64');
            photoPath = `/uploads/${fileName}`;
        }

        await Student.findByIdAndUpdate(id, { ...updatedData, photoPath }, { new: true });
        res.status(200).json({ message: "Student data updated successfully." });
    } catch (error) {
        console.error("Error updating student data:", error);
        res.status(500).json({ message: "Error updating student data", error: error.message });
    }
});

// Route to delete a student by ID
app.delete('/api/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (student.photoPath) {
            const filePath = path.join(__dirname, student.photoPath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Student.findByIdAndDelete(id);
        res.status(200).json({ message: "Student deleted successfully." });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
});

// Start Server
connectToMongoDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));