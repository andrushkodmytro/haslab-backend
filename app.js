const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config')
var cors = require('cors')


const register = require('./routes/register.js');
const account = require('./routes/account.js');
const PORT = config.get('PORT');
const auth = require('./middleware/auth.middleware.js')

const Uri = 'mongodb+srv://dbmern:User2020@cluster0.zy8tt.mongodb.net/dbmern?retryWrites=true&w=majority';

app.use(express.json({ extended: false }))

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:true, 
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use('/api/auth',cors(), register);
app.use('/api',cors(corsOptions),account);

async function start() {
  try {
    await mongoose.connect(Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, ()=>{console.log('Server started')});
  } catch (e) {
    console.log(e, 'error');
  }
}

start();
