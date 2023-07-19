const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const smtp_login = process.env.SMTP_LOGIN || '---';
const smtp_password = process.env.SMTP_PASSWORD || '---';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
});

app.get('/', function (req, res) {
    res.send('Hello world!')
});

app.post('/sendMessage', async function (req, res) {

    const {name, email, message} = req.body;

    const info = await transporter.sendMail({
        from: 'Portfolio form', // sender address
        to: "2805nika@gmail.com", // list of receivers
        subject: "Portfolio form", // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>Message from portfolio</b>
        <div>name: ${name}</div>
        <div>email: ${email}</div>
        <div>message: ${message}</div>`

        , // html body
    });

    res.send('hej!')
    //res.send(req.body)

});

const port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log('example app listening on port 3000!')
});