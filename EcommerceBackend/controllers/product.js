const Product=require('../models/product')
const formidable=require('formidable')
const _ =require('lodash')
const fs=require('fs') //for getting paths
//const { sortBy } = require('lodash')
//const { updateOne } = require('../models/product')
const category = require('../models/category')
const order = require('../models/order')
const getProductById=(req,res,next,id)=>{
    console.log("lol")
    Product.findById(id)/*.populate("category",*/.exec((err,pro)=>{
        if(err||!pro) return res.status(400).json({error:"No product found"});
        req.product=pro;
        console.log(req.product)
        next();
    })   
}

const createProduct=(req,res)=>{
    let form =new formidable.IncomingForm();  //handling form data
    form.keepExtensions=true //to keep the extensions like .png .jpg 
    form.parse(req,(err,fields,file)=>{
        if(err) return res.status(400).json({error:"problem with image file"})
        //destructuring the fields
        const {name,description,price,category,stock}=fields;
        //console.log(fields)
        if(!name||!description||!price||!category||!stock)
            return res.status(400).json({error:"please include all fields"});

        let product=Product(fields)
        //handle file

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({error:"file size too big"})
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
        console.log(product)
        //save to db
        product.save((err,product)=>{
            if(err || !product)return res.status(400).json({error:"error saving tshirt to DB"});
            res.json(product)
        })

    })
}


const getProduct=(req,res)=>{
    req.product.photo=undefined  //since it is bulky
    return res.json(req.product)
}

//middleware to store data of photo into response
const photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data)  //i didnt understood :(  
    }
    next();
}

const deleteProduct=(req,res)=>{
    console.log("appppigaaaaa")
    const product=req.product;
    product.remove((err,pro)=>{
        console.log("appppigaaaaa")
        if(err||!pro) return res.status(400).json({msg:"Unable to delete"});
        return res.json({msg:"deleted successfully"})
    })
}

const updateProduct=(req,res)=>{

    console.log("@backend loaded")
    let form =new formidable.IncomingForm();  //handling form data
    form.keepExtensions=true //to keep the extensions like .png .jpg 
    form.parse(req,(err,fields,file)=>{
        if(err) return res.status(400).json({error:"problem with image file"})

        //destructuring the fields
        const {name,description,price,category,stock}=fields;
        //console.log(fields)
        if(!name||!description||!price||!category||!stock)
            return res.status(400).json({error:"please include all fields"});
        console.log("yaara")
        console.log(req.product)
        //update using lodash for form-data
        let product=req.product;
        product=_.extend(product,fields)

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({error:"file size too big"})
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
        console.log(product)
        //save to db
        product.save((err,product)=>{
            if(err || !product)return res.status(400).json({error:"error saving tshirt to DB"});
            res.json(product)
        })

    })
}

const getAllProducts=(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit):8;  //whenever u see ? that is query.generally filters
    let sortBy=req.query.sortBy?req.query.sortBy:"_id";
    Product.find()
        .select("-photo") //dont show photo field
        .sort([[sortBy,"asc"]]) //sortby whatever query is set in sortby
        .limit(limit)
        .exec((err,pros)=>{
        if(err||!pros) return res.status(400).json({err:"Products not found"});
        res.json(pros);
    })
}

const getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){return res.status(400).json({error:"Distinct categories cant be fethed"})}
        res.json(categories);
    })
}


const updateStock=(req,res,next)=>{
    console.log("enter the dragon")
    let orderitems={}
    let solditems={}
    next()
    /*
    req.body.order.products.map(prod=>{
        if(orderitems[prod._id]!==undefined){
            orderitems[prod._id]=orderitems[prod._id]-1
            solditems[prod._id]=solditems[prod._id]+1
        }
        else{
            orderitems[prod._id]=prod.stock-1
            solditems[prod._id]=prod.sold+1
        }
    })
    var flag=0
    console.log("CART=",orderitems)
    /*req.body.order.products.map(prod=>{
        Product.findByIdAndUpdate({_id:prod._id},{$set:{stock:orderitems[prod._id],sold:solditems[prod._id]}},{new:true,useFindAndModify:false},(err,pro)=>{
            if(err){
                flag=1
           console.log(err)}
        })
        
    })
    
    
    next();*/
}


/*

const updateStock=(req,res,next)=>{
    console.log("@#")
    let myOperations = req.body.order.products.map( prod=>{
        return { updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock: -prod.count,sold: +prod.count}}
            } 
        }
    })

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){return res.status(400).json({error:"Bulk operation got failed"})}
            next();
    }) //Sends multiple insertOne, updateOne, updateMany, replaceOne, deleteOne,
                        // and/or deleteMany operations to the MongoDB server in one command. 
                    console.log("opoqqqqqq");
    
}

*/


module.exports={getProductById,createProduct,getProduct,deleteProduct,photo,updateProduct,getAllProducts,updateStock,getAllUniqueCategories};