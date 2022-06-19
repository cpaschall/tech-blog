const router = require('express').Router();
const User = require('../../models/User');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
      const userData = await User.create({
                user_name: req.body.user_name,
                password: req.body.password
              });
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { user_name: req.body.user_name } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user_name: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    // find all users
    try {
      const userData = await User.findAll({
        attributes: ["id", "user_name","password"],
      });
      res.json(userData);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });

  router.post('/logout', (res,req) =>{
    if(req.session.logged_in) {
      req.session.destroy(() =>{
        res.status(204).end();
      })
    }else {
      res.status(404).end();
    }
  })



module.exports = router;