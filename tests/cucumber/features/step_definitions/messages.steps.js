module.exports = function() {
  this.Given(/^there are the following messages:$/, function(messages, callback) {
    this.server.call('testData', messages.hashes(), callback);
  });

  this.Then(/^I should see (\d+) messages$/, function(nrStr, callback) {
    var nr = parseInt(nrStr);
    this.client
      .waitForVisible('.container .message')
        .elements('.container .message')
        .then(function(res) { return res.value.length; })
      .should.become(nr)
        .and.notify(callback);
  });

  this.Then(/^message (\d+) should be \"(.+)\"$/, function(nr, value, callback) {
    this.client
      .waitForVisible('.container .message')
        .element('.container .message:nth-child(' + nr + ')')
        .getText('p > span:nth-child(2)')
      .should.become(value)
        .and.notify(callback);
  });

  this.Then(/^the author of message (\d+) should be \"(.+)\"$/, function(nr, value, callback) {
    this.client
      .waitForVisible('.container .message')
        .element('.container .message:nth-child(' + nr + ')')
        .getText('p > .author')
      .should.become(value)
        .and.notify(callback);
  });

  this.Then(/^the timestamp of message (\d+) should be \"(.+)\"$/, function(nr, value, callback) {
    this.client
      .waitForVisible('.container .message')
        .element('.container .message:nth-child(' + nr + ')')
        .getText('time')
      .should.become(value)
        .and.notify(callback);
  });

  this.After(function(callback) {
    this.server.call('reset', callback);
  });
};
