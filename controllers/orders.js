const Orders = require('../models/Orders');

exports.ordersGet = async (req, res) => {
  try {

    res.json({ message: "Get" });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

exports.ordersPost = async (req, res) => {
  try {
    const {name, companyId, productId, quantity} = req.body;
    
    if(!name){
      res.status(422).json({message: 'Order name is required.'})
    }
    
    if(!companyId){
      res.status(422).json({message: 'Order companyId is required.'})
    }

    
    if(!productId){
      res.status(422).json({message: 'Order productId is required.'})
    }
   
    const newOrder  = new Orders({name, companyId, productId, quantity})
   
    await newOrder.save();

    res.status(201).json({ message:'New order is created.', product: newOrder });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}