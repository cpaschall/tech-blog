const router = require('express').Router();
const userRoutes = require('./userRoutes');
const articleRoutes = require('./articleRoutes')
const seedDatabaseRoutes = require('./seedRoutes')

router.use('/users', userRoutes);
router.use('/articles', articleRoutes)
router.use('/seedDatabase', seedDatabaseRoutes);


module.exports = router;