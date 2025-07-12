const UserModel = require('../database/models/users');
const { encryptPassword } = require('../utility');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    try {
        const userData = await UserModel.findOne({ email: req.body.email });
        if (userData) {
            return res.status(409).json({
                success: false,
                message: "This email is already exists"
            });
        }
        const spassword = encryptPassword(req.body.password);

        await UserModel.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: spassword,
            mobile: req.body.mobile,
            address: req.body.address,
            user_type: "customer"
        });
        const token = jwt.sign({data: userData}, process.env.KEY);
        res.json({ 
            success: true,
            data: userData, 
            token: token,
            message: "Registration succesfull"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error",
            error: err
        });
    }
};

