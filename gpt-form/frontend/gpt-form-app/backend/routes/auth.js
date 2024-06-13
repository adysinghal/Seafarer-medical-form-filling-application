const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Adidad$d*y';


// ROUTE 1: create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Name must have at least 3 characters.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must have atleast 5 characters.').isLength({ min:5 })
], async (req, res) => {
    
    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }

    try{
        console.log("hello");
        console.log(JWT_SECRET);
        // check if email already exists
        let user = await User.findOne({ email: req.body.email });

        if(user){
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user._id
            }
        }

        const authToken = await jwt.sign(data, JWT_SECRET, {expiresIn: '1d'});

        success = true;
        res.json({ success, authToken });
    }catch(error){
        return res.status(500).json({ error:"Failed to create user"})
    }
}) 


// ROUTE 2: Authenticate a user using : POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error:"Please try to login with valid credentials."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"Please try to login with valid credentials."})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET,  {expiresIn: '1d'});

        success = true;
        res.json({ success, authToken });
    }catch(error){
        return res.status(500).json({ error:"Please try to login with valid credentials."})
    }
})


module.exports = router
