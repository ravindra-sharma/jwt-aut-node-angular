var bp = require('body-parser');
var User = require('./models/user');
var jwt = require('jwt-simple')
var bc = require('bcrypt-nodejs');
var router = require('express').Router();

router.post('/register',function(req,res){
        var u = req.body;
        var user = new User(u);
        user.save((err,result)=>{
            if(err)
                res.send(err)
            else
                res.send(result)
        })
    });
router.post('/login',async(req,res)=>{
        var u = req.body;
        var user = await User.findOne({email:u.email});
        
        if(!user.email){
            return res.status(404).send("user not found")
        }
    
        bc.compare(u.password,user.password,function(err,match){
            if(!match)
                return res.status(401).send("password is incorrect")
            
            res.status(200).send({token:jwt.encode({},'1234')})
        })
        
            
       
    }
)

module.exports = router