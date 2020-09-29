const {Productcart,Order}=require('../models/order')
const getOrderById=(req,res,next,id)=>{
    console.log("HAI")
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        console.log("ORDER=",order)
        if(err||!order)
            return res.status(400).json({error:"No order found"});
        req.order=order;
        next();
    })
    .catch(err=>console.log("error=",err))   
}
const createOrder=(req,res)=>{
    console.log("creating...")
    req.body.order.user=req.profile;
    const order=new Order(req.body.order)
    order.save((err,order)=>{
        if(err || !order) return res.status(400).json({error:"order not saved in db"});
        res.json(order);
    })
}

const getAllOrders=(req,res)=>{
    Order.find().populate("user","_id name").exec((err,orders)=>{
        if(err||!orders) return res.status(400).json({error:"No orders found"})
        res.json(orders);
    })

}


const getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}

const updateStatus=(req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){return res.status(400).json({error:"Cannot update order status"})}
            res.json(order);
        }
    )
}


module.exports={getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}