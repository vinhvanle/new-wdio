import Page from '../page';
import { expect, should, assert } from 'chai';
import constants from '../../../data/constants.json' assert { type: 'json' };

class PlatformLandingPage extends Page {
  constructor() {
    super();
  }
  /**
   * Define page elements
   */
  get navigationFilterInput() {
    return $(`#filter`);
  }
  /**
   * Define page functions
   */

  /**
   * Function for searching the module name in the navigation filter
   * @param {string} module
   */
  async searchModule(module) {
    await this.typeInto(this.navigationFilterInput, module);
    //assertion
    expect(await this.navigationFilterInput.getValue()).to.equal(module);
  }
  /**
   * Function for choosing the module name in the navigation filter
   * @param {string} module
   */
  async chooseModule(module) {
    const targetSysId = constants['moduleSysId'][module];

    let target = $(`a[id='${targetSysId}']`);
    await this.click(target);
  }
}
export default new PlatformLandingPage();
