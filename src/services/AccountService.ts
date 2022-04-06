import axios from 'axios'
import qs from 'qs'

export default {
  /**
   * Gets new token for the provided user-credentials from the authentication-server.
   *
   * @param username Username to user-credentials. (E-mail)
   * @param password Password to user-credentials
   * @returns {AxiosPromise}
   */
  getToken (username: String, password: String) {
    const data = { username: username, password: password };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "http://localhost:8085/token"
    };

    // @ts-ignore
    return axios(options);
  }
}
