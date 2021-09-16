Feature: FILTER EVENTS BY CITY

    Scenario: When a user hasn’t searched for a city, show upcoming events from all cities.

        Given user hasn’t searched for a city
        When the user opens the app
        Then the user should see a list of all upcoming events

    Scenario: The user should see a list of suggestions when they search for a city.

        Given the main page is open
        When user starts typing in the city searchfield
        Then the user should see a list of cities that match the letters they will type.

    Scenario: User can select a city from the suggested list.

        Given user was typing “Berlin” in the city textbox
        And the list of suggested cities is showing
        When the user clicks on one of the cities (e.g., Berlin) that are suggested
        Then the city will be changed to the selected city
        And list upcoming events from there.