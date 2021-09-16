Feature: SPECIFY NUMBER OF EVENTS

    Scenario: When user hasn’t specified a number, 32 is the default number
        Given the list of events was loaded
        When a user did not select a number of shown events
        Then the default number will have been set to 32 events

    Scenario: A user can change the number of events they want to see
        Given the list of events was loaded
        When the user puts a number in a field next to the search field
        Then the list of events will update and the amount will be set to that specific number