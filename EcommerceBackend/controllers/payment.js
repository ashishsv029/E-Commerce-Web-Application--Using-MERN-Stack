var braintree=require('braintree');

var gateway=braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId:   'c6ss7hjjwsm5mbqs',
    publicKey:    'npv5dsxswjnmd8p9',
    privateKey:   'b4421e2a4775d0dd978fb43cda11c40c'
})

const getToken=(req,res)=>{
    gateway.clientToken.generate({},(err,response)=>{
            if(err){res.status(500).send(err)}
            else{
                res.send(response)
            }
        }
    )
}
const processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){res.status(500).send(err)}
          else{
              res.send(result)
          }
      });
}
module.exports={getToken,processPayment}