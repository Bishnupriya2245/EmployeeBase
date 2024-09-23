import Employee from "../models/Employee.js";



export const createEmployee = async (req, res) => {
    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

        const newEmployeeData = {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
            f_Image: req.file.path, 
        };

        const newEmployee = new Employee(newEmployeeData);
        await newEmployee.save();
        res.status(200).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

        const updatedData = {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
        };

        if (req.file) {
            updatedData.f_Image = req.file.path; 
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchEmployee = async (req, res) => {
    try {
        const { name } = req.query; 
        const employees = await Employee.find({ f_Name: new RegExp(name, 'i') }); 
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
