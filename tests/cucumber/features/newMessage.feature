Feature: As a user I can post new messages

@dev
Scenario: The new message form is not displayed for anonymous users
  Given there are the following messages:
    | Message     | Username | Time     | User ID |
    | Hi everyone | Person1  | 08:00:00 | 1       |
    | Hi          | Person2  | 07:00:00 | 2       |
  When I visit the application
  Then I should see 2 messages
    And I should not see the message form

@dev
Scenario: The new message form is displayed
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
  Then I should see the message form

@dev
Scenario: The new message form counter is displayed
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
  Then the message form counter should be 140

@dev
Scenario: The counter counts down when typing a new message
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
    And I enter a new message of 5 characters
  Then the message form counter should be 135

@dev
Scenario: The counter becomes red when the message is too long
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
    And I enter a new message of 141 characters
  Then the message form counter should be -1
    And the counter should be red

@dev
Scenario: The button is disabled if there is no new message
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
  Then the submit button should be disabled

@dev
Scenario: The button is enabled if there is a valid message
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
    And I enter a new message of 10 characters
  Then the submit button should be enabled

@dev
Scenario: The button is disabled if the message is too long
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
    And I enter a new message of 141 characters
  Then the submit button should be disabled


@dev
Scenario: A message is added to the list of messages
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
    And I enter a message "hello"
    And I submit the message
  Then I should see 1 messages

@dev
Scenario: The message field becomes empty after submitting
  Given a user exists with the name "Person1"
  When I visit the application
    And I log in as "Person1"
    And I enter a message "hello"
    And I submit the message
  Then the message form counter should be 140
    And the message field should be empty
