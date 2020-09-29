const express=require("express")
const router=express.Router();

const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {getCategoryById,createCategory,getCategory,getCategories,updateCategory,deleteCategory}=require('../controllers/category')

router.param("userId",getUserById)//Map the given param placeholder name(s) to the given callback(s).
router.param("categoryId",getCategoryById)//Map the given param placeholder name(s) to the given callback(s).


router.post("/category/create/:userId",isSignedin,isAuthenticated,isAdmin,createCategory)

router.get("/category/:categoryId",getCategory)
router.get("/categories",getCategories)

router.put("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,updateCategory)

router.delete("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,deleteCategory)
module.exports=router;