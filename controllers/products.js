const Products = require('../models/Products');

exports.productsGet = async (req, res) => {
  try {

    res.json({ message: "Get" });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

exports.productsPost = async (req, res) => {
  try {
    const {name, companyId} = req.body;
    
    if(!name){
      res.status(422).json({message: 'Product name is required.'})
    }
    
    if(!companyId){
      res.status(422).json({message: 'Product userId is required.'})
    }
   
    const product= await Products.find({name})


    if(product.length){
      res.status(422).json({message: 'Product with this name is already exist.'})
    }
   
    const newProduct  = new Products({name, companyId})
   
    await newProduct.save();

    res.status(201).json({ message:'New product is created.', product: {name, companyId} });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}