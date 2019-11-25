const nodemailer = require('nodemailer');

const alerter = function sendEmail(
    emailSender,
    passwordSender,
    emailReceiver,
    emailSubject,
    emailMessage) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailSender,
            pass: passwordSender
        }
    });

    const mailOptions = {
        from: emailSender,
        to: emailReceiver,
        subject: emailSubject,
        text: emailMessage
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = alerter;