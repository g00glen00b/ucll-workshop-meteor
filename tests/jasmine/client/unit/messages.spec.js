describe('Messages template', function() {
  function helper(name) {
    return Template.messages.helpers.firstCall.args[0][name];
  }

  beforeEach(function() {
    Messages = sinon.stub({
      find: function() {}
    });
  });

  it('finds all messages', function() {
    helper('messages')();
    expect(Messages.find.calledOnce).toBeTruthy();
  });

  it('sorts the messages based on their time', function() {
    helper('messages')();
    expect(Messages.find.getCall(0).args[1].sort.time).toBe(-1);
  });

  it('formats a date to a timestamp', function() {
    expect(helper('time')(moment('18:23:45', 'HH:mm:ss').toDate()))
      .toBe('18:23:45');
  });

  it('is the owner of the message if the user ID is the same as the owner property', function() {
    Meteor.userId.returns('123-456-789');
    expect(helper('isOwner')({
      message: 'Hi',
      date: new Date(),
      owner: '123-456-789'
    })).toBeTruthy();
  });

  it('is not the owner of the message if the user ID does not match', function() {
    Meteor.userId.returns('123-456-789');
    expect(helper('isOwner')({
      message: 'Hi',
      date: new Date(),
      owner: '456-789-123'
    })).toBeFalsy();
  });
});
