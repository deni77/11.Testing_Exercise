const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('Messenger tests', function () {
    this.timeout(20000);

    //{ headless: false, slowMo: 3000 }
    before(async () => { browser = await chromium.launch({headless:false,slowMo:2000}); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('load messages', async () => {
        await page.goto('http://127.0.0.1:5500/index.html');

        await page.click('text=Refresh');

        const messages = await page.$eval("#messages", el => el.value.split('\n'));

        expect(messages[0]).to.equal('Spami: Hello, are you there?');
        expect(messages[1]).to.equal('Garry: Yep, whats up :?');
        expect(messages[2]).to.equal('Spami: How are you? Long time no see? :)');
        expect(messages[3]).to.equal('George: Hello, guys! :))');
        expect(messages[4]).to.equal('Spami: Hello, George nice to see you! :)))');
    });

    it('send message', async () => {
        await page.goto('http://127.0.0.1:5500/index.html');

        await page.fill('#author', 'Peter');
        await page.fill('#content', 'Hi, guys!');

        await page.click('#submit');

        await page.click('text=Refresh');

        const messages = await page.$eval("#messages", el => el.value.split('\n'));

        expect(messages[0]).to.equal('Spami: Hello, are you there?');
        expect(messages[1]).to.equal('Garry: Yep, whats up :?');
        expect(messages[2]).to.equal('Spami: How are you? Long time no see? :)');
        expect(messages[3]).to.equal('George: Hello, guys! :))');
        expect(messages[4]).to.equal('Spami: Hello, George nice to see you! :)))');
        expect(messages[5]).to.equal('Peter: Hi, guys!');
       
    })

});