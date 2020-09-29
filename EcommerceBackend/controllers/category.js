const Category=require('../models/category');


const getCategoryById=(req,res,next,id)=>{
    Category.findById(id,(err,cat)=>{
        if(err||!cat) return res.status(400).json({error:"No such category found in DB"});
        req.category=cat;
        next();
    }) 
}

const createCategory=(req,res)=>{
    const category=new Category(req.body)
    console.log(category);
    category.save((err,cat)=>{
        if(err||!cat) return res.status(400).json({error:"some error"});
        res.json(cat);
    })
}


const getCategory=(req,res)=>{
    return res.json(req.category)
}


const getCategories=(req,res)=>{
    console.log("getting categories")
    Category.find({},(err,cat)=>{
        if(err||!cat) return res.status(400).json({error:"categories not found"})
        res.json({cat});
    })
}

const updateCategory=(req,res)=>{
    const category=req.category
    category.name=req.body.name
    Category.findByIdAndUpdate({_id:req.category._id},{$set:req.body},{new:true,useFindAndModify:false},(err,cat)=>{
        if(err || !cat)return res.status(400).json({error:"you are not authorized to do update"})
       
        res.json({cat});
    })
}

const deleteCategory=(req,res)=>{
    console.log("vaammo")
    const category=req.category //similar to Category
    category.remove((err,cate)=>{
        if(err || !cate)return res.status(400).json({error:"you are not authorized to do delete"})
        res.json({message:"deleted this $(cate.name)"})
    })
}

module.exports={getCategoryById,createCategory,getCategory,getCategories,updateCategory,deleteCategory};