const express=require('express')
const router=express.Router()

const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
//const {getCategoryById,createCategory,getCategory,getCategories,updateCategory,deleteCategory}=require('../controllers/category')
const {getProductById,createProduct,getProduct,deleteProduct,photo,updateProduct,getAllProducts,updateStock,getAllUniqueCategories}=require('../controllers/product');

router.param("userId",getUserById)
router.param("productId",getProductById);

router.get("/product/:productId",getProduct);
router.post("/product/create/:userId",isSignedin,isAuthenticated,isAdmin,createProduct)
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);//fe part
console.log("mahesh")

router.put("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,updateProduct)
router.get("/products",getAllProducts);
router.get("/products/categories",getAllUniqueCategories)

router.delete("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,deleteProduct);
module.exports=router
