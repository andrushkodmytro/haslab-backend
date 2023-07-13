const Companies = require('../models/Companies');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('JWT_SECRET');

exports.companiesGet = async (req, res) => {
  try {
    const { headers } = req;

    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const allCompanies = await Companies.find();
    const companies = await User.find({ _id: id }).populate('companyId').select('companyId').lean();

    res.json({ data: { allCompanies, companies } });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.companiesPost = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const company = await Companies.find({ name });

    if (!name) {
      res.status(422).json({ message: 'Company name is required.' });
    }

    if (!userId) {
      res.status(422).json({ message: 'Company userId is required.' });
    }

    if (company.length) {
      res.status(422).json({
        message: 'Company with this name is already exist.',
      });
    }

    const newCompany = await new Companies({ name, userId: [userId] });
    await newCompany.save();

    const user = await User.updateOne({ _id: userId }, { $set: { companyId: newCompany._id } });

    res.status(201).json({
      message: 'New company is created',
      company: { name, userId: [userId] },
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
