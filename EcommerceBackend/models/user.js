const crypto=require('crypto');
const {v1:uuidv1}=require('uuid');
//import {v1 as uuidv1} from 'uuid';
var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
name:{
    type: String,
    required: true,
    maxlength: 32,
    trim:true
},
lastname:{
    type:String,
    maxlength:32,
    trim:true
},
email:{
    type:String,
    trim:true,
    required:true, //if u give required definitely u should pass it..
    unique:true
},
userinfo:{
    type:String,
    trim:true,  //removes extra spaces
},
encrypt_password:{
    type:String,
    required:true,
},
salt:{
    type: String
},
role:{
    //the higher number the more prevailages i have
    type:Number,
    default:0 //for users
},
purchases:{
    type:Array,
    default:[]
}
},{timestamps:true});

//attaching virtuals to our schema
userSchema.virtual("password")
.set(function(password){
    this._password=password; //creating a new virtual PRIVATE PASSWORD based on the password sent
    this.salt=uuidv1();
    this.encrypt_password=this.securePassword(password);
})
.get(function(){
    return this._password
});

//we can also attach methods to our schema..here our method will be converting password into a hashed value
userSchema.methods={

    authenticate: function(password){
        return this.securePassword(password)===this.encrypt_password
    },

    securePassword: function(password){
        //if u return empty then there at encrypt_password wwe made required true..so it doesnt accept empty and show error
        if(!password)
            return "";
        else{
            try{
                //using inbuilt crypto functionality of node..we can encrypt the pwd..
                return crypto.createHmac('sha256',this.salt)
                .update(password)
                .digest('hex');
            }catch(err){
                return "";
            }
        }
    }
}

module.exports=mongoose.model("User",userSchema);


