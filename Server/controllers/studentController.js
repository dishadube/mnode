import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
    try {
        const {medium,studentName,rollNo,course,motherName,gender,cast } = req.body;
        const student = await Student.create({medium,studentName,rollNo,course,motherName,gender,cast});
        res.json({ msg: "student created successfully", student });
    } catch (error) {
        res.status(400).json({ msg: "Error creating student", error: error.message });
    }
};

export const getStudents = async (req,res)=>{
   const students = await Student.find();
   res.json(students);
}

