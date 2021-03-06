var express = require('express');
var router = express.Router();

router.get('/createTask',function(req,res){
    var newTask = new Task();

    newTask.save(function(err,data){
        if(err) {
            console.log(err);
            res.render('error');
        }
        else {
            res.redirect('/task/'+data._id);
        }
    });

});

router.get('/task/:id',function(req,res){
    if(req.params.id) {
        Task.findOne({_id:req.params.id},function(err,task){
            if(err) {
                console.log(err);
                res.render('error',{error:err})
            }
            if(task) {
                res.render('task',{content: task.content, input:task.input, output:task.output, roomId: task._id});
            }
            else {
                res.render('error');
            }
        });
    }
    else {
        res.render('error');
    }
});

module.exports = router;