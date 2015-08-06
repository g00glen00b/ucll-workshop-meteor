describe('New message template', function() {
  function helper(name) {
    return Template.newMessage.helpers.firstCall.args[0][name];
  }

  function invokeEvent(name, args) {
    return Template.newMessage.events.firstCall.args[0][name](args);
  }

  beforeEach(function() {
    Session = sinon.stub({
      get: function() {},
      set: function() {}
    });

    Messages = sinon.stub({
      insert: function() {}
    });

    Meteor.user.returns({ username: 'JohnDoe' });
  });

  describe('A counter', function() {
    it('initializes the message count at startup', function() {
      Meteor.startup.lastCall.callArg(0);
      expect(Session.set.calledWith('messageCount', 0)).toBeTruthy();
    });

    it('counts down from 140 characters', function() {
      Session.get.returns(10);
      expect(helper('count')()).toBe(130);
    });

    it('shows a negative number if counter is past 140', function() {
      Session.get.returns(150);
      expect(helper('count')()).toBe(-10);
    });
  });

  describe('A message', function() {
    it('is valid if not empty', function() {
      Session.get.returns(1);
      expect(helper('isValidMessage')()).toBeTruthy();
    });

    it('is not valid if empty', function() {
      Session.get.returns(0);
      expect(helper('isValidMessage')()).toBeFalsy();
    });

    it('is not valid if the message is too long', function() {
      Session.get.returns(141);
      expect(helper('isValidMessage')()).toBeFalsy();
    });

    it('is too long if it passes 140 characters', function() {
      Session.get.returns(141);
      expect(helper('isMessageTooLong')()).toBeTruthy();
    });

    it('is not too long if it is less than 140 characters', function() {
      Session.get.returns(139);
      expect(helper('isMessageTooLong')()).toBeFalsy();
    });
  });

  describe('Creating a new message', function() {
    var myForm;
    beforeEach(function() {
      myForm = { message: { value: 'My message' } };
    });

    it('prevents the default event', function() {
      expect(invokeEvent('submit form', { target: myForm }))
        .toBeFalsy();
    });

    it('resets the value of the message', function() {
      invokeEvent('submit form', { target: myForm });
      expect(myForm.message.value).toBe('');
    });

    it('inserts a new message', function() {
      invokeEvent('submit form', { target: myForm });
      expect(Messages.insert.calledOnce).toBeTruthy();
      expect(Messages.insert.firstCall.args[0].message)
        .toEqual('My message');
    });

    it('saves the user ID with the message', function() {
      Meteor.userId.returns('123-456-789');
      invokeEvent('submit form', { target: myForm });
      expect(Messages.insert.firstCall.args[0].owner)
        .toEqual('123-456-789');
    });

    it('saves the username with the message', function() {
      Meteor.user.returns({ username: 'JohnDoe' });
      invokeEvent('submit form', { target: myForm });
      expect(Messages.insert.firstCall.args[0].username)
        .toEqual('JohnDoe');
    });

    it('saves the current date with the message', function() {
      invokeEvent('submit form', { target: myForm });
      expect(moment(Messages.insert.firstCall.args[0].time)
          .isSame(new Date(), 'day'))
        .toBeTruthy();
    });
  });

  it('sets the message count to the form value length', function() {
    invokeEvent('keyup input[name=message]', { target: { value: 'My message' }});
    expect(Session.set.calledWith('messageCount', 10)).toBeTruthy();
  });
});
