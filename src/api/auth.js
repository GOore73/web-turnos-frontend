import { ENV } from '../utils'

export class Auth {
  baseApi = ENV.BASE_API;
  async register(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        })
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
    }
  }
  async login(data) {
    const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
    const params = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw response;
      return result;

    } catch (error) {
      return error
    }
  }
}