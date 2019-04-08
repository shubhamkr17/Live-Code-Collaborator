var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/register')
    .get(function(req, res, next) {
        res.render('register', { title: 'Register | CodeCollab' });
    })
    .post(function(req,res,next){
        req.checkBody('name','Empty name').notEmpty();
        req.checkBody('email','Invalid email').isEmail();
        req.checkBody('password','Empty password').notEmpty();
        req.checkBody('password','Passwords do not match').equals(req.body.confirmPassword).notEmpty();

        var errors = req.validationErrors();
        console.log("validated errors!");
        if(errors) {
            res.render('register',{
                name : req.body.name,
                email : req.body.email,
                errorMessages : errors
            });
        }
        else {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            
            user.save(function(err){
                if(err) {
                    console.log(err);
                    if(err.code == 11000)
                        res.render('register',{errorMessages : [{msg:"This user already exists"}]});
                    else
                        res.render('register',{errorMessages : err});
                }
                else
                    res.redirect('/login');
            });
        }

    });
  
router.route('/login')
    .get(function(req, res, next) {
        res.render('login', { title: 'Login | CodeCollab' });
    })
    .post(passport.authenticate('local',{
        failureRedirect : '/login'
    }),function(req,res,next){
        res.redirect('/');
    });

router.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/');
});

module.exports = router;