const mongoose = require('mongoose');
const Rooms = require('../models/Room.js');
const Category = require('../models/Categories.js');
const roomsSeed = require('./roomsSeed');
const categoriesSeed = require('./categoriesSeed');
const Product = require('../models/Products.js');
const productsSeed = require('./productsSeed.js');

const Uri = 'mongodb://127.0.0.1:27017/marketdb';

async function addCategories() {
  const addedCategories = await Category.insertMany(categoriesSeed);
  console.log(`${addedCategories.length} categories added`);
}

async function deletedAllCategories() {
  const deletedCategories = await Category.deleteMany({});
  console.log(`${deletedCategories.length || 0} categories deleted`);
}

async function addRooms() {
  const addedRooms = await Rooms.insertMany(roomsSeed);
  console.log(`${addedRooms.length} rooms added`);
}

async function deletedRooms() {
  const deletedRooms = await Rooms.deleteMany({});
  console.log(`${deletedRooms.length || 0} rooms deleted`);
}

async function addProducts() {
  const { productsMap, ...seeds } = productsSeed;
  const productKeys = Object.keys(seeds);

  for (const key of productKeys) {
    const room = await Rooms.findOne();
    const roomId = room._id;
    const category = await Category.findOne({ name: productsMap[key] });
    const categoryId = category._id;
    console.log('====>', productsMap, key, category);
    const products = productsSeed[key].map((item) => {
      item.categoryId = categoryId;
      item.roomId = roomId;

      return item;
    });

    const addedProducts = await Product.insertMany(products);
    console.log(`${addedProducts.length} products added`);
  }
}

async function deletedProducts() {
  const deletedProducts = await Product.deleteMany({});
  console.log(`${deletedProducts.length || 0} products deleted`);
}

async function start() {
  console.log('======Start seed======');

  await mongoose.connect(Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  try {
    await deletedAllCategories();
    await addCategories();

    await deletedRooms();
    await addRooms();

    await deletedProducts();
    await addProducts();

    console.info('======Close db connection======');
    await mongoose.connection.close();
  } catch (e) {
    console.log('Seed error', e);
  }

  console.log('======End seed======');
}

start();

// const data=[];

// $('.product').each(function( index ) {
//     const $container = $(this)
//     const item={};

//     item.imgUrl=$container.find('.card-image').eq(0).attr('src');
//     item.price = parseInt($container.find('.price-value').text().replaceAll(',', '').replaceAll('\n', '').replaceAll('$', '').trim());
//     item.description='';
//     item.categoryId='';
//     item.roomId='';
//     item.name= $container.find('.product-item-title a').text();

//     data.push(item)
// });

// console.log(data)




// const data=[];

// $('.productView-thumbnail-link').each(function( index ) {
//     const $container = $(this)
//     let item='';

//     item=$container.find('img').attr('src');
  

//     data.push(item)
// });

// console.log(data)
