const router = require('express').Router();
const  {Purchase} = require('../../models');

router.get('/', (req, res) => {
  Purchase.findAll({
    where: {
      user_id: req.session.user_id
    },
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id
//     },
//     // include: [
//     //   {
//     //     model: Post,
//     //     attributes: ['id', 'title', 'post_url', 'created_at']
//     //   },
//     //   {
//     //     model: Comment,
//     //     attributes: ['id', 'comment_text', 'created_at'],
//     //     include: {
//     //       model: Post,
//     //       attributes: ['title']
//     //     }
//     //   },
//     //   {
//     //     model: Post,
//     //     attributes: ['title'],
//     //     through: Vote,
//     //     as: 'voted_posts'
//     //   }
//     // ]
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/', (req, res) => {
    console.log("====================")
    console.log(req.body)
    Purchase.create({
        title: req.body.BookTitle,
        price:req.body.BookPrice,
        user_id: req.session.user_id
      }).then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});


router.put('/:id', (req, res) => {
  Cart.update(
    req.body,
    {
      where: {
        UserId: req.body.UserId
      }
    }).then(function (dbShoppingcart) {
      res.json(dbShoppingcart);
    });
});

router.delete('/:id', (req, res) => {
  Cart.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
