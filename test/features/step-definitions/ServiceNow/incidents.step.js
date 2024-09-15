import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, should, assert } from 'chai';
import reporter from '../../../helper/reporter';
import Page from '../../../page-objects/page';
import LoginPage from '../../../page-objects/ServiceNow/login.page';
import platformLandingPage from '../../../page-objects/ServiceNow/platformLanding.page';

import constants from '../../../../data/constants.json' assert { type: 'json' };
import ui_actions from '../../../../data/ui_actions.json' assert { type: 'json' };
import incidentsListPage from '../../../page-objects/ServiceNow/incidentsList.page';

Given(/^As a (.*) user, I login to ServiceNow$/, async function (userRole) {
  reporter.addStep(
    this.testID,
    'info',
    `Starting to login as ${userRole} user`
  );

  try {
    await LoginPage.login(
      userRole,
      process['env'][`${userRole}_USERNAME`],
      process['env'][`${userRole}_PASSWORD`]
    );
  } catch (err) {
    err.message = `Something went wrong while login as ${userRole} user, ${err.message}`;
    throw err;
  }
});

Then(/^I should be on (.*) page$/, async function (targetPage) {
  reporter.addStep(
    this.testID,
    'info',
    `Starting to verify that user has logged in successfully and is at the correct landing page: ${targetPage}`
  );
  targetPage = targetPage.toUpperCase();
  if (targetPage === 'PLATFORM') {
    let url = await browser.getUrl();
    let title = await browser.getTitle();
    expect(url).to.contain(constants.platform_landing_page_url);
    expect(title).to.not.contain('Log in');
  }
});

When(
  /^I (search|choose) (.*) module in the navigation filter$/,
  /**
   *
   * @param {string} module
   */
  async function (action, module) {
    if (!action || !module) {
      throw Error(`Given action: ${action} or module: ${module} is invalid`);
    }
    reporter.addStep(
      this.testID,
      'info',
      `Starting to ${action} ${module} module in the navigation filter`
    );
    try {
      action = action.toUpperCase();
      module = module.toUpperCase();
      switch (action) {
        case 'SEARCH':
          await platformLandingPage.searchModule(module);
          break;
        case 'CHOOSE':
          await platformLandingPage.chooseModule(module);
          break;
      }
    } catch (err) {
      err.message = `Failed when ${action} ${module} module in navigation filter, ${err.message}`;
      throw err;
    }
  }
);

When(
  /^I click (.*) UI Action$/,
  /**
   *
   * @param {string} UIActionName
   */
  async function (UIActionName) {
    if (!UIActionName) {
      throw Error(`Given UIAction: ${UIActionName} is invalid`);
    }
    reporter.addStep(
      this.testID,
      'info',
      `Starting to click ${UIActionName} UI Action`
    );
    try {
      UIActionName = UIActionName.toLowerCase();

      //switch to main screen iframe
      const iframe = await $('#gsft_main');
      await browser.switchToFrame(iframe);

      // click UIAction
      const btn = await $(`button[id='${ui_actions[UIActionName]}']`);
      await btn.click();
      await browser.pause(3000);
    } catch (err) {
      err.message = `Something went wrong when clicking UI Action: ${UIActionName}, ${err.message}`;
      throw err;
    }
  }
);
