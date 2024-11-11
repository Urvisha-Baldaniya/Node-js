const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const PORT = 9000;


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());


// const users = {
//     userEmail: 'user@babalu.com',
//     userPassword: 'password123'
// }; // register


// Authentication middleware
const authMiddleware = (req, res, next) => {
    const { authToken } = req.cookies;


    if (authToken && authToken === 'VALID_TOKEN') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


// Routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;


    if (email === "ram@gmail.com" && password === "ram@123") {


        const authToken = 'VALID_TOKEN';


        res.cookie('authToken', authToken, { httpOnly: true });


        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logged out successfully' });
});


app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
