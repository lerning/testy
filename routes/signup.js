var express = require('express');
var router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', (req, res) => {
   let username = req.body.username
   let password = req.body.password
   if (!username || !password){
      res.render ('signup', {error: 'fill it all in you dingus'})
   }
   knex('users')
      .where('username' , username)
      .first()
      .then((user) => {
         console.log('user.username', user);
         if (user){
            console.log('oh noo');
            res.render('signup', {error: 'Already a user'})
         } else {
            knex('users')
            .returning('*')
            .insert({
              'username': req.body.username,
              'hashed_password': bcrypt.hashSync(req.body.password, 10)
           })
            .then((data) => {
               console.log('data', data);
               res.redirect('/login')
            })
         }
      })
})

module.exports = router;
