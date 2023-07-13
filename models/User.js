const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');

const userSchema = new Schema(
  {
    email: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    roles: [{ type: String }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function (remember) {
  const user = this;
  const delta = remember ? 60 * 60 * 24 * 7 : 60 * 60;

  const expiresIn = Math.floor(Date.now() / 1000) + delta;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    JWT_SECRET,
    { expiresIn }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return { token, expiresIn };
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

const User = model('User', userSchema);

module.exports = User;
