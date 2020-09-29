const mongoose=require('mongoose')

const {ObjectId}=mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:312
    },
    price:{
        type:Number,
        required:true,
        maxlength:32
    },
    //category is coming from category schema..just like using category as a foriegn key here
    category:{
        type:ObjectId, //we declared it at beginning
        ref:"Category",  //this is the name which we gave to categorySchema
        required:true
    },
    stock:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{  //here we will be using small size photos..so we can easily pullout from db without much burden..otherwise
                    //u need to create a folder and pull those photos using its address orany other reference from there
        data:Buffer,
        contentType:String
    }
},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);