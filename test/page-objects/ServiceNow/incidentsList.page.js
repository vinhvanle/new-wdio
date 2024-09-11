import Page from '../page';
import UIAction from '../../../data/ui_actions.json' assert { type: 'json' };

class IncidentListPage extends Page {
  constructor() {
    super();
  }

  /**
   * Define elements in the page
   */

  get new() {
    return $(`button[id='sysverb_new']`);
  }

  get resolve() {
    return $(`button[id='resolve_incident']`);
  }

  get save() {
    return $(`button[id='sysverb_insert_and_stay']`);
  }
  /**
   * Define functions on the page
   */

  /**
   *
   * @param {string} UIActionName
   * @returns {WebdriverIO.Element}
   */
  async getUIAction(UIActionName) {
    console.log(
      `>>>> UIAction object: ${JSON.stringify(await this[UIActionName])}`
    );

    const btn = await this[UIActionName];

    await btn.click();

    // await this.click(await this[UIActionName]);
  }
}

export default new IncidentListPage();
