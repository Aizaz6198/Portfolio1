const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

// Serve your HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html');
});

// Handle form submissions
app.post('/process_form', (req, res) => {
    const { name, email, subject, description } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aizaz060198@gmail.com',
            pass: 'ffnb teaj opgf qtar'
        }
    });

    // Compose email
    const mailOptions = {
        from: email,
        to: 'Aizaz060198@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nDescription:\n${description}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
