var DEFAULT_PASSWORD = 'p4ssw0rd';

module.exports = function() {
  this.When(/^I visit the application$/, function(callback) {
    this.client.url(process.env.ROOT_URL).call(callback);
  });

  this.Given(/^a user exists with the name \"(.+)\"$/, function(name, callback) {
    this.server.call('testUser', name, DEFAULT_PASSWORD, callback);
  });

  this.When(/^I log in as \"(.+)\"$/, function(name, callback) {
    this.client
      .waitForVisible('.login-link-text')
        .click('.login-link-text')
      .waitForVisible('#login-dropdown-list')
        .setValue('#login-username', name)
        .setValue('#login-password', DEFAULT_PASSWORD)
        .click('#login-buttons-password')
      .waitForVisible('#login-name-link')
        .getText('#login-name-link')
      .should.eventually.contain(name)
        .and.notify(callback);
  });

  this.After(function(callback) {
    this.client.execute(function() {
      Meteor.logout();
    }).should.eventually.notify(callback);
  });
};
