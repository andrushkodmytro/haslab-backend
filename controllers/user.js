const User = require('../models/User.js');

exports.registerPost = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const newUser = await User.findOne({ email }).lean().exec();

    if (newUser) {
      return res.status(409).json({ message: 'This user is already exist' });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      roles: ['user'],
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.loginPost = async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    const user = await User.findByCredentials(email, password);

    const { token, expiresIn } = await user.generateAuthToken(remember);

    res.send({ user, token, expiresIn });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.logoutPost = async (req, res) => {
  const removedToken = req.headers.authorization.split(' ')[1];

  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== removedToken);
    await req.user.save();

    res.send({ message: 'Ok' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.userUpdate = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'password'];

  try {
    updates.forEach((update) => {
      if (allowedUpdates.includes(update)) req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send({ message: 'User updated' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.userUpdateByAdmin = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName'];

  if (!req.user.roles.includes('admin')) {
    res.status(401).send({ message: 'Not allowed' });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }

    updates.forEach((update) => {
      if (allowedUpdates.includes(update)) user[update] = req.body[update];
    });

    await user.save();

    res.send({ message: `User updated` });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.userGet = async (req, res) => {
  const { user } = req;

  try {
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
