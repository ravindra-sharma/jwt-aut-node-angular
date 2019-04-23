var mon = require('mongoose')
var bc = require('bcrypt-nodejs')

var sch = new mon.Schema({
    email:String,
    password:String,
    name:String,
    desc:String
});

sch.pre('save',function(next){
    var user = this;

    if(!user.isModified('password')){
        return next();
    }

    bc.hash(user.password,null,null,function(err,hash){
        if(err) return next(err)

        user.password = hash;
        next();
    })
})

module.exports = mon.model('User',sch,'userinfo')