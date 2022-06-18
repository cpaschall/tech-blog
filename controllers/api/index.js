const router = require('express').Router();
const userRoutes = require('./user-routes');
const articleRoutes = require('./article-routes')
const seedDatabaseRoutes = require('./seed-routes')

router.use('/users', userRoutes);
router.use('/articles', articleRoutes)
router.use('/seedDatabase', seedDatabaseRoutes);


module.exports = router;