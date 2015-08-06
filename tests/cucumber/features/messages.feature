Feature: As an anonymous user I can see the posted messages

@dev
Scenario: The persisted messages are displayed
  Given there are the following messages:
    | Message     | Username | Time     | User ID |
    | Hi everyone | Person1  | 08:00:00 | 1       |
    | Hi          | Person2  | 07:00:00 | 2       |
  When I visit the application
  Then I should see 2 messages

@dev
Scenario: The messages are ordered by time
  Given there are the following messages:
    | Message     | Username | Time     | User ID |
    | Hi everyone | Person1  | 08:00:00 | 1       |
    | Hi          | Person2  | 07:00:00 | 2       |
  When I visit the application
  Then message 1 should be "Hi everyone"
    And message 2 should be "Hi"

@dev
Scenario: The messages contain the author
  Given there are the following messages:
    | Message     | Username | Time     | User ID |
    | Hi everyone | Person1  | 08:00:00 | 1       |
    | Hi          | Person2  | 07:00:00 | 2       |
  When I visit the application
  Then the author of message 1 should be "Person1"
    And the author of message 2 should be "Person2"

@dev
Scenario: The messages have a timestamp
  Given there are the following messages:
    | Message     | Username | Time     | User ID |
    | Hi everyone | Person1  | 08:00:00 | 1       |
    | Hi          | Person2  | 07:00:00 | 2       |
  When I visit the application
  Then the timestamp of message 1 should be "08:00:00"
    And the timestamp of message 2 should be "07:00:00"
