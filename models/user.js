var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/UserAuth', { useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true});

var db= mongoose.connection;

var UserSchema=mongoose.Schema({
    username:{
        type : String,
        index : true
    },
    password:{
        type : String,
        
    },
    email:{
        type : String,
        index : true
    },
    name:{
        type : String,
        
    },
    profileimage:{
        type : String,
        
    },
});

var User= module.exports = mongoose.model('User',UserSchema);

module.exports.createUser=function(newUser,callback){
    newUser.save(callback);
}