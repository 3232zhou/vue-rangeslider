// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.root');
  },

  'check tooltip with mouse hover': function test(browser) {
    browser
      .assert.elementPresent('.range-slider__handle--max')
      .moveToElement('.range-slider__handle--max', 0, 0)
      .isVisible('.range-slider__tooltip')
  },

  'check tooltip when mouse drag': function test(browser) {
    browser
    .mouseButtonDown()
    .moveTo(100, 100)
    .assert.attributeContains('.range-slider__handle--max > .range-slider__tooltip', 'innerHTML', '80');
  },

  'check tooltip when mouse up': function test(browser) {
    browser
    .mouseButtonUp()
    .isVisible('.range-slider__tooltip', function(result){
      this.assert.equal(result.status, 0);
      this.assert.equal(result.value, false);
    })
  },

  'end test': function test(browser) {
    browser.end();
  }

};
