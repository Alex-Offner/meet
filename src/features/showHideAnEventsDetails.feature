Feature: SHOW/HIDE AN EVENT'S DETAILS

    Scenario: An event element is collapsed by default
        Given the main page is loaded
        When a user looks at a single event
        Then the details of the event are hidden by default with an option to show more details

    Scenario: User can expand an event to see its details
        Given the page and the list of events is shwoing
        When a user clicks on the details button
        Then the user will be able to see an element showing him the details of that specific event

    Scenario: User can collapse an event to hide its details
        Given a user clicked on an event and its details are shown
        When a user clicks on the hide button
        Then the details will collapse and be hidden from view