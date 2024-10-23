const { Builder, By, Key, WebDriver, WebElement, Browser, until } = require("selenium-webdriver");
const assert = require("assert");
var should = require("chai").should();
const capabilities = require("../capabilities");
const browser = require('selenium-webdriver/firefox');
const { Should } = require("chai");
const { text } = require("express");

describe("Search and confirm from Data art official page", function () {
    let driver;
    let baseUrl = "https://www.dataart.team";

    before(async function () {
        //Browser setup
        let options = new browser.Options();
        driver = new Builder()
            .forBrowser(Browser.FIREFOX)
            .setFirefoxOptions(options)
            .build();
        //Base URL
        await driver.get(baseUrl);
    });
    after(async () => await driver.quit());

    it("check main page title", async function () {
        //print main page title name
        let pageTitleText = await driver.getTitle();

        //Vanilla assert
        assert.equal("DataArt Careers - Your Partner for Progress in Tech Industry", pageTitleText);

        //Chai assert
        pageTitleText.should.equal("DataArt Careers - Your Partner for Progress in Tech Industry")
    });
    it("search keyword 'qa' from main page and assert results", async function () {
        //call url
        await driver.get(baseUrl);
        //navagate to search btn and wait a for it to click
        search = await driver.findElement(By.css("#root .HeaderWrapper-RightSide > button"));
        //wait page load
        driver.wait(until.elementIsVisible(search), 6000);
        try {
            should.exist(search)
            console.log("************searchBtn is found**************")
        } catch (err) {
            console.log(err)
        }
        await search.click();
        //navagate to search bar and enter search value then wait for loading to complite  
        let searchBar = await driver.findElement(By.css(".HeaderWrapper-Search_active"));
        try {
            should.exist(searchBar)
            console.log("************searchBarInput is found**************")
        } catch (err) {
            console.log(err)
        }
        let textFiledInput = await driver.findElement(By.css(".SearchForm-Inner .TextField-Input"));
        textFiledInput.sendKeys("qa", Key.RETURN);
        await driver.sleep(1000)
        let searchIconWait = await driver.findElement(By.css(".Loader > img"))
        if (searchIconWait.isDisplayed()) {
            await driver.sleep(9000);
        }
        //Assert search results value
        let searchResultsCheck = await driver.findElement(By.css(".SearchPage-Field .TextField-Body > div:nth-child(2)")).getText();
        console.log(searchResultsCheck);
        driver.wait(until.elementIsVisible(searchResultsCheck), 6000);
        searchResultsCheck.should.equal("Found: 23")
    });
});
console.log("FINISH!");