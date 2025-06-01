const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', async(req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'isaackibwe646@gmail.com', // your email
            pass: 'bags adda lwok zotm' // use app password if using Gmail
        }
    });

    const mailOptions = {
        from: email,
        to: 'isaackibwe646@gmail.com', // where you want to receive messages
        subject: `Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending email', error: err });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});