const { validationResult, check } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/users");
const { issueToken } = require("../common/util");

exports.register = async (req, res, next) => {
    // Check if logged in ?
    if(req.userInfo) {
        const err = new Error('Already Logged In!');
        err.statusCode = 403;
        next(err);
    }

    try {    
        // Validate Data
        await check('mail').exists().trim().escape().isEmail().withMessage('Invalid Email!').normalizeEmail().run(req);
        await check('pass').exists().trim().isString().isLength({ min: 8, max: 20}).withMessage('Min Passwird length is 8 & max is 20').run(req);

        const errs = validationResult(req);
        if(!errs.isEmpty()) {
            const err = new Error('Validation Error!');
            err.statusCode = 422;
            err.data = errs.array();
            throw err;
        }

        //Check if email exists
        const emailExists = await User.findOne({ where: { mail: req.body.mail } });
        if(emailExists) {
            throw new Error('Email Already Exist!');
        }

        // Create password hash
        const pwd = req.body.pass;
        const hashedPass = await bcrypt.hash(pwd, 12);

        // Insert into db
        const cUser = await User.create({
            mail: req.body.mail,
            pass: hashedPass
        });

        /**
         * Create token
         */
        const payload = {
            id: cUser.dataValues.id,
            mail: cUser.dataValues.mail,
            status: cUser.dataValues.status,
            role: 'access'
        }

        const token = issueToken(payload);

        res.status(200).json({
            msg: 'success',
            token: token,
            expiresIn: 90
        });

    } catch (err) {
        if(!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
}

exports.login = async (req, res, next) => {
    // Check if logged in ?
    if(req.userInfo) {
        const err = new Error('Already Logged In!');
        err.statusCode = 403;
        next(err);
    }

    try {
        // Validate Data
        await check('mail').exists().trim().escape().isEmail().withMessage('Invalid Email!').normalizeEmail().run(req);
        await check('pass').exists().trim().isString().isLength({ min: 8, max: 20}).withMessage('Min Passwird length is 8 & max is 20').run(req);

        const errs = validationResult(req);
        if(!errs.isEmpty()) {
            const err = new Error('Validation Error!');
            err.statusCode = 422;
            err.data = errs.array();
            throw err;
        }

        // Request Payload
        const mail = req.body.mail;
        const pass =  req.body.pass;

        // Find by email
        const user = await User.findOne({ where: {
            mail: mail,
            status: 1
        } });

        if(!user) {
            const err = new Error('Email or Password Incorrect!');
            err.statusCode = 400;
            throw err;
        }

        // If user found
        const storedPass = user.dataValues.pass

        // Check if password is correct
        const passCorrect = await bcrypt.compare(pass, storedPass);

        if(!passCorrect) {
            const err = new Error('Email or Password Incorrect!');
            err.statusCode = 400;
            throw err;
        }

        /**
         * Create token
         */
        const payload = {
            id: user.dataValues.id,
            mail: user.dataValues.mail,
            status: user.dataValues.status,
            role: 'access'
        }

        const token = issueToken(payload);

        res.status(200).json({
            msg: 'success',
            token: token,
            expiresIn: 90
        });

    } catch (err) {
        if(!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
}