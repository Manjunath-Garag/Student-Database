var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* Connecting to Database.*/
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student'
});
conn.connect(function(err,res){
    if(err)
        console.log(err.message);
    else
        console.log("connected");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Post student details.*/
router.post('/insertStu',function(req,res,next) {
    var data= {
        name : req.body.name,
        email : req.body.email
    };
    var query = "INSERT INTO stu set ?"
    console.log(query);
    conn.query(query,[data],function(err,details){
        if(err){
            console.log(err);
        }
        else{
            res.json(details);
        }
    })
});

/* To Update the Info*/
router.put('/updateInfo/:id',function(req,res,next){
    var data= {
        name : req.body.name,
        email : req.body.email
    };
    var id = req.params.id;
    var query = "UPDATE stu set ? WHERE id = ? ";

    conn.query(query,[data,id],function(err,student){
        if(err){
            console.log(err);
        }else{
            res.json(student);
        }
    })
});


/* Get info of the Students.*/
router.get('/allStuInfo',function(req,res,next)
{
    var query='SELECT * FROM stu'
    conn.query(query,function(err, student) {
        if (err){
            res.send(err);
        }//res json for the list of restaurants from server.
        else{
            res.json(student);
        }
    });
});

/* To det Info of a Particular stdent based on ID*/
router.get('/allStuInfo/:id',function(req,res,next)
{
    var id =req.params.id;
    var query='SELECT * FROM stu WHERE id=?';
    conn.query(query,[id],function(err, details) {
        if (err){
            res.send(err);
        }//res json for the list of restaurants from server.
        else{
            res.json(details);
            console.log(details);
        }
    });

});

/* Delete Student form DataBase.*/
router.delete('/deleteStu/:id',function(req,res,next) {
    var stu_id = req.params.id;
    console.log(stu_id);
    var query = "DELETE FROM stu WHERE id= ?"
    conn.query(query,[stu_id],function(err, details){
        if(err)
        {
            console.log(err);
        }else{
            res.json(details);
        }
    });
});

/* Posting the data on to the DB*/
router.post('/stuInfo/:id', function(req,res,next){
    var stu_id = req.params.id;
    var data= {
        id:req.params.id,
        phy :req.body.phy,
        che :req.body.che,
        math :req.body.math
    };

    var query = "INSERT INTO prof set ?"
    conn.query(query,[data],function(err,details){
        if(err){
            console.log(err);
        }
        else{
            res.json(details);
        }
    })
});

/* To display the complete Student Database.*/
router.get('/completeInfo',function(req,res,next){
    var query = "SELECT stu.id,stu.name,prof.phy,prof.che,prof.math FROM stu, prof WHERE stu.id = prof.id";
    conn.query(query,function(err,details){
        if(err)
        {
            console.log(err);
        }else{
            res.json(details)
        }
    })
})

module.exports = router;
