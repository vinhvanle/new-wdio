import Page from '../page';

class LoginPage extends Page {
  constructor() {
    super();
  }

  /**
   * Define elements in the page
   */

  get usernameInput() {
    return $(`#user_name`);
  }
  get passwordInput() {
    return $(`#user_password`);
  }
  get loginBtn() {
    return $(`#sysverb_login`);
  }

  /**
   * Define functions on the page
   */

  /**
   * function to navigate to the login page and login with the provided credentials
   * @param {string} userRole
   * @param {string} username
   * @param {string} password
   */
  async login(userRole, username, password) {
    if (!userRole) {
      throw Error(`Given userRole: ${userRole} is invalid`);
    }
    try {
      await this.navigateTo('login.do');
      await this.typeInto(await this.usernameInput, username);
      await this.typeInto(await this.passwordInput, password);
      await this.click(await this.loginBtn);
    } catch (err) {
      err.message = `Error while login in to ServiceNow: ${err.message}`;
      throw err;
    }
  }
}

export default new LoginPage();
