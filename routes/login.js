var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', (req, res) => {
   console.log('berdy', req.body);
   let username = req.body.username
   let password = req.body.password
   console.log(bcrypt.hashSync(password, 10));
   if (!username || !password){
      res.render ('login', {error: 'fill it all in you dingus'})
   }
   knex('users')
      .where('username', username)
      .first()
      .then((user) => {
         console.log(user);
         let hashed_password = bcrypt.compare(password, user.hashed_password, (err, result) => {
            if (result) {
               let token = jwt.sign({user: user}, 'secret_key')
               res.cookie('token', token)
               res.redirect('/reptiles')
            }else {
               res.render('login', {error: 'incorrect password you jabrone'})
            }
         })
      })
})

module.exports = router;
