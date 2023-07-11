import { ENV } from '../utils'

export class Center {
  baseApi = ENV.BASE_API;

  async createCenter(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CENTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw { "status": response.status, "statusText": result?.msg || response.statusText };
      return { "status": 201, "statusText": "OK", data: result };
    } catch (err) {
      return (err);
    }
  }
}
