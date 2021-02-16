const Companies = require('../models/Companies');

exports.companiesGet = async (req, res) => {

  try {
    const companies = await Companies.find()
    

    res.json({ message: 'Ok', companies });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

exports.companiesPost = async (req, res) => {
  const {name, userId} = req.body
  
    try {
      const company = await Companies.find({name})
  
      if(!name){
        res.status(422).json({message: 'Company name is required.'})
      }
  
      if(!userId){
        res.status(422).json({message: 'Company userId is required.'})
      }
  
      if(company.length){
        res.status(422).json({message: 'Company with this name is already exist.'})
      }
  
      const newCompany = await new Companies({name, userId:[userId]})
      await newCompany.save()
  
      res.status(201).json({ message: 'New company is created', company:{name, userId:[userId]} });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }