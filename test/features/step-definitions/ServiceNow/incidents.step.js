import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, should, assert } from 'chai';
import reporter from '../../../helper/reporter';
import Page from '../../../page-objects/page';
import LoginPage from '../../../page-objects/ServiceNow/login.page';
import platformLandingPage from '../../../page-objects/ServiceNow/platformLanding.page';

import constants from '../../../../data/constants.json' assert { type: 'json' };
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
   * @param {string} UIAction
   */
  async function (UIAction) {
    if (!UIAction) {
      throw Error(`Given UIAction: ${UIAction} is invalid`);
    }
    reporter.addStep(
      this.testID,
      'info',
      `Starting to click ${UIAction} UI Action`
    );
    try {
      UIAction = UIAction.toLowerCase();
      const btn = await incidentsListPage.getUIAction(UIAction);
      await incidentsListPage.click(btn);
    } catch (err) {
      err.message = `Something went wrong when clicking UI Action: ${UIAction}, ${err.message}`;
      throw err;
    }
  }
);
