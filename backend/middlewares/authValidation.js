import Joi from "joi";




export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
      f_userName: Joi.string().min(6).max(10).required(),
      f_Pwd: Joi.string().min(4).max(8).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad request", error});
    }

    next(); 

};



