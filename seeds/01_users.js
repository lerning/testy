
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'joshua', hashed_password: '$2a$10$u9tqRww5VxHKkawOKo3Hb.ZWslkduomM5lF5U6QCXgR5oVx6OV7FK'},
        {username: 'tomu', hashed_password: ''},
      ]);
    });
};
