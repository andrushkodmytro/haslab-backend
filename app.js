const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const PORT = config.get('PORT');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const auth = require('./middleware/auth.middleware.js');

var cors = require('cors');

const register = require('./routes/register.js');
const accounts = require('./routes/accounts.js');
const companies = require('./routes/companies.js');
const products = require('./routes/products.js');
const orders = require('./routes/orders.js');
const categories = require('./routes/categories.js');
const carts = require('./routes/carts.js');

// const Uri = 'mongodb+srv://dbmern:User2020@cluster0.zy8tt.mongodb.net/dbmern?retryWrites=true&w=majority';
const Uri = 'mongodb://127.0.0.1:27017/marketdb';

// const Uri = 'mongodb://127.0.0.1:27017/newdatabase';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Custom Api',
      description: 'Custom Api info',
      contact: {
        name: 'Amazing Developer',
      },
    },
    servers: ['http://localhost:5000'],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json({ extended: false }));

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(morgan('tiny'));
app.use('/api/auth', cors(), register);
app.use('/api/account', cors(), accounts);
app.use('/api/companies', cors(), companies);
app.use('/api/products', cors(), products);
app.use('/api/orders', cors(), orders);
app.use('/api/categories', cors(), categories);
app.use('/api/carts', cors(), carts);

async function start() {
  try {
    await mongoose.connect(Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(process.env.PORT || PORT, () => {
      console.log('Server started');
    });
  } catch (e) {
    console.log(e, 'error');
  }
}

start();
