# meet

This meet app will be a sverless, progressive web app, written with React and using the test-driven development technique. The google Calendar API will be used to fetch upcoming events.


## Upcoming Features, User stories and scenarios

* FEATURE 1: FILTER EVENTS BY CITY:

User story: As a user I should be able to filter events by city, so that i can see the list of events that take place in that city.

Scenario 1: When a user hasn’t searched for a city, show upcoming events from all cities. 


Given user hasn’t searched for a city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario 2: The user should see a list of suggestions when they search for a city.

Given the main page is open
When user starts typing in the city searchfield
Then the user should see a list of cities that match the letters they will type. 

Scenario 3: User can select a city from the suggested list.

Given the user typed some letters in the searchfield 
When the user clicks on one of the cities that are suggested
Then the city will be changed to the selected city and list upcoming events from there.



* FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

User story: As a user I should be able to show or hide event details by clicking on a button next to the event, so that I can access more information about it.

Scenario 1: An event element is collapsed by default.

Given the main page is open and loaded a list of events
When a user looks at a single event
Then the details of the event are hidden by default 

Scenario 2: The user can expand an event to see its details.

Given the page and the list of events where loaded
When a user clicks on a button next to single event
Then the user will be able to see an element showing him the details of that specific event

Scenario 3: The user can collapse an event to hide its details

Given a user clicked on an event and its details are shown
When a user clicks on the same button again
Then the details will collapse and be hidden from view



* FEATURE 3: SPECIFY NUMBER OF EVENTS:
User story: As a user I should be able to specify the number of events in a search field, so that I can only see as many events as the number. 

Scenario 1: When a user hasn’t specified a number, 32 is the default number.
Given the list of events was loaded and no number has been specified
When a user counts the amount of listed events
Then the default number will have been set to 32 events.
Scenario 2: A user can change the number of events they want to see.
Given the list of events was loaded
When  the user puts a number in a field next to the search field
Then the list of events will update and the amount will be set to that specific number

* FEATURE 4: USE THE APP WHEN OFFLINE
User story: As a user I should be able to access the app when I am offline, so that I can still see upcoming events and their details.


Scenario 1: Show cached data when there’s no internet connection.
Given the user is offline and already loaded the page at least once
When the user tries to access event details or looks through the events
Then the cached data will be displayed to the user
Scenario 2: Show error when user changes the settings (city, time range).
Given the user is offline
When the user tries to change the city or the time range of the listed events
Then an error message will inform the user that he is offline

* FEATURE 5: DATA VISUALIZATION

User story: As a user I should be able to see a chart that shows the number of upcoming events by city, so that I can see future options.

Scenario 1: Show a chart with the number of upcoming events in each city.
Given the page is loaded
When the user searches for a city
Then a chart will be displayed that shows the upcoming events in that city

