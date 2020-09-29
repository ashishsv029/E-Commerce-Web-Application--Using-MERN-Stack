const express=require('express');
const mongoose=require('mongoose');
const app=express();
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order');
const paymentRoutes=require('./routes/payment')
const bodyparser=require("body-parser");
const cookieparser=require('cookie-parser');
const cors=require('cors');
require('dotenv').config();

//connecting with mongodb
const db=require('./config/keys').MongoURI;

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err));

//declaring middlewares
app.use(bodyparser.json()); //it will be just looking for jsondata and parses it
app.use(cookieparser());
app.use(cors());

//Routes Redirected..
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',paymentRoutes);
//listening on port
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`server started at port no ${PORT}`));
