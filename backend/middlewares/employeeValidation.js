import Joi from 'joi';

export const employeeValidation = (req, res, next) => {
    const schema = Joi.object({
        f_Name: Joi.string().min(3).max(50).required(),
        f_Email: Joi.string().email().required(),
        f_Mobile: Joi.string().pattern(/^[0-9]+$/).required().messages({
            'string.pattern.base': 'Mobile number must be numeric and contain only digits.'
        }),
        f_Designation: Joi.string().required(),
        f_Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        f_Course: Joi.string().optional(),
        f_Createdate: Joi.date().default(Date.now),
        f_Image: Joi.string().optional() 
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }

    next();
};
