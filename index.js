const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    service: 'gmail',
    auth: {
        user: '2805nika@gmail.com',
        pass: 'xrrkbguufnmjczqn'
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

//let port = process.env.PORT || 3010;

app.listen(3010, function () {
    console.log('example app listening on port 3000!')
});