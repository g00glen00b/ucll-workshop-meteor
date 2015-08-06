function createString(nr) {
  var data = [];
  for (var idx = 0; idx < nr; idx++) {
    data.push(idx % 10);
  }
  return data.join('');
}

module.exports = function() {
  this.Then(/^I should not see the message form$/, function(callback) {
    this.client
      .waitForVisible('.container')
      .elements('form[name=message]')
      .then(function(res) { return res.value.length; })
    .should.eventually.equal(0)
      .and.notify(callback);
  });

  this.Then(/^I should see the message form$/, function(callback) {
    this.client
      .waitForVisible('form[name=message]')
      .should.eventually.notify(callback);
  });

  this.Then(/^the message form counter should be (-?\d+)$/, function(nr, callback) {
    this.client
      .waitForVisible('form[name=message]')
        .getText('.count')
      .should.eventually.equal(nr)
        .and.notify(callback);
  });

  this.When(/^I enter a new message of (\d+) characters$/, function(nr, callback) {
    this.client
      .waitForVisible('form[name=message]')
        .setValue('input[name=message]', createString(nr))
      .should.eventually.notify(callback);
  });

  this.Then(/^the counter should be red$/, function(callback) {
    this.client
      .waitForVisible('form[name=message] .count.danger')
      .should.eventually.notify(callback);
  });

  this.Then(/^the submit button should be disabled$/, function(callback) {
    this.client
      .waitForVisible('form[name=message] button[disabled]')
      .should.eventually.notify(callback);
  });

  this.Then(/^the submit button should be enabled$/, function(callback) {
    this.client
      .waitForVisible('form[name=message] button')
        .elements('form[name=message] button[disabled]')
        .then(function(res) { return res.value.length; })
      .should.become(0)
        .and.notify(callback);
  });

  this.When(/^I enter a message \"(.+)\"$/, function(message, callback) {
    this.client
      .waitForVisible('form[name=message]')
        .setValue('input[name=message]', message)
      .should.eventually.notify(callback);
  });

  this.When(/^I submit the message$/, function(callback) {
    this.client
      .waitForVisible('form[name=message]')
        .submitForm('form[name=message]')
      .should.eventually.notify(callback);
  });

  this.Then(/^the message field should be empty$/, function(callback) {
    this.client
      .waitForVisible('form[name=message]')
        .getText('input[name=message]')
      .should.become('')
        .and.notify(callback);
  });
};
