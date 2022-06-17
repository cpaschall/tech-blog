const sequelize = require('../config/connection');
const { User, Article } = require('../models');

const userData = require('./userData.json');
const articleData = require('./articleData.json');

const seedDatabase = async () => {
  // creates the tables
  await sequelize.sync({ force: true });

  // reads an array of objects
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  
  // for data with foreign keys, you want to use a for loop to create each data
  // record and randomize the keys if needed
  for (const article of articleData) {
    await Article.create({
      ...article,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // close the database connection and close the program
  // don't use this if the seed is going to be part of a route
  process.exit(0);
};

seedDatabase();
