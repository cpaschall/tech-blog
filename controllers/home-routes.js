const router = require('express').Router();
const { Article, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/seedTest', async (req, res) => {
    try {
        let article = await Article.findOne({
            where: {
                art_body: "Article 2"
            }
        });
        article = article.get({ plain: true });
        res.render('seedtest', {article})
    } catch (err) {
        res.status(404).send("Article not found")
    }
});

// get all users
router.get('/', async (req, res) => {
    // const userData = await User.findAll().catch((err) => {
    //     res.json(err);
    // });
    try {
        const articleData = await Article.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });
        const articles = articleData.map((article) => article.get({ plain: true }));
        res.render('homepage', {
            articles,
        logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
    // const users = userData.map((user) => user.get({ plain: true }));
    // const posts = 
    // res.render('homepage', { users, posts });
});

// get 1 article
router.get('/article/:id', async (req, res) => {
    try {
      const articleData = await Article.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
        ],
      });
  
      const article = articleData.get({ plain: true });
  
      res.render('article', {
        ...article,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('dashboard');
});
module.exports = router;