const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');
// const {format}


// router.post('/', withAuth, async (req, res) => {
router.post('/', withAuth, async (req, res) => {
    try {
        const newArticle = await Article.create({
            ...req.body, 
            user_id: req.session.user_id,
        });

        res.status(200).json(newArticle);
    } catch (err) {
        res.status(400).json(err)
    }
});

// router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const articleData = await Article.destroy({ 
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!articleData) {
            res.status(404).json({ message: 'No article found with this ID' });
            return;
        }

        res.status(200).json(articleData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", withAuth, async (req, res) => {
    // find all users
    try {
      const articleData = await Article.findAll({
        attributes: ["id", "title", "art_body", "date_created"],
      });
      res.json(articleData);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });


module.exports = router;