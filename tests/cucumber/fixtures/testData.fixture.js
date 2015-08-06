Meteor.methods({
  "testData": function(messages) {
    messages.forEach(function(data) {
      Messages.insert({
        message: data['Message'],
        username: data['Username'],
        owner: data['User ID'],
        time: moment(data['Time'], "HH:mm:ss").toDate()
      })
    });
  },
  "reset": function() {
    Messages.remove({});
  },
  "testUser": function(user, password) {
    try {
      Accounts.createUser({
        username: user,
        password: password,
        email: 'noop@example.org'
      });
    } catch (err) {
      if (err.reason !== 'Username already exists.') {
        throw err;
      }
    }
  }
});
