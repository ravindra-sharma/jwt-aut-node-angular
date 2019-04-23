var mon = require('mongoose');
var schema = mon.Schema;

module.exports = mon.model('Post',new schema({
    msg:String,
    author:{ type: schema.Types.ObjectId,ref:'User'}
}))
