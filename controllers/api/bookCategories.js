const router = require('express').Router();
const {Books} = require('../../models');

router.get('/:id', (req, res) => {
    console.log(req.param.id)
    Books.findAll({
        where: {
                  booktype: req.params.id
                },
        attributes: [
            'id',
            'booktype',
            'bookname',
            'bookimage',
            'price'
          ],
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  module.exports = router;