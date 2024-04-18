const nodemailer = require('nodemailer')
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const juice = require('juice')
const emailSending = async (booking) =>{
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ham118849@gmail.com',
      pass:'flwn zqtc sbnc na'
    }
  });
  const templateFilePath = path.join(__dirname, '../src/views/emailTemplate.ejs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const data = booking


const renderedEmail = ejs.render(templateFile, { data: data });


const inlinedEmail = juice(renderedEmail);


    const mailOptions = {
        to: 'universitycadiayad@gmail.com',
        from: 'ham118849@gmail.com',
        subject:`FMPM Hall Booking Confirmation: Your Booking for ${data.Hall.name} is Confirmed`,
        html:inlinedEmail
};

// Send email
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

}

module.exports = emailSending