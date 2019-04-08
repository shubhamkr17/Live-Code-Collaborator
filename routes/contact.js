var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

router.route('/')
.get(function(req, res, next) {
  res.render('contact', { title: 'Contact | CodeCollab' });
})
.post(function(req, res, next){
  req.checkBody('name','Empty name.').notEmpty();
  req.checkBody('email','Invalid email.').isEmail();
  req.checkBody('message','Empty message.').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    res.render('contact',{
      title : 'Contact',
      name : req.body.name,
      email : req.body.email,
      message : req.body.message,
      errorMessages : errors
    });
  }
  else
  {
      var mailOptions = {
          from : 'CodeCollab <no-reply@codecollab.com>',
          to : 'sk767285@gmail.com',
          subject : 'New email form a visitor at CodeCollab 🤗',
          text : req.body.message
      }
      sendmail(mailOptions,res);
    //   transporter.sendMail(mailOptions,function(err,info){
    //       if(err) {
    //         return console.log("Error in sending email : %s",err);
    //       }
    //       res.render('thank',{ title: 'Thanks'});

    //   });
      
  }
});

//for testing purpose
//use ethereal email
function sendmail(message,res) {
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });


        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render('thank',{ title: 'Thanks'});
        });
    });
}

module.exports = router;