
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    jest.setTimeout(15000);
    beforeAll(async () => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 250,
            // ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .show-details-button');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .hide-details-button');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });

});

describe('Filter events by city', () => {
    let browser;
    let page;
    jest.setTimeout(15000);
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.city');
    });


    afterAll(() => {
        browser.close();
    });
    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        const showAllEvents = await page.$('.event');
        expect(showAllEvents).toBeDefined();
    })
    test('user should see a list of suggestion when they search for a city', async () => {
        const searchForACity = await page.$('.city');
        await searchForACity.type('berlin');
        const suggestions = await page.$$('.suggestions li')
        expect(suggestions).toBeDefined();
    })
    test('user can select a city from the suggest list', async () => {
        const suggestionCityList = await page.$('.suggestions')
        expect(suggestionCityList).toBeDefined();
    })
});