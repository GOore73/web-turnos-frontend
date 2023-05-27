import { ENV } from '../utils'

export class User {
  baseApi = ENV.BASE_API;
  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw { response, result };
      return { response, result };
    } catch (error) {
      return error;
    }
  }

  async createUser(accessToken, data) {
    try {
      // Este proceso es cuando se tiene un multipart/form-data en lugar de un json en data
      const formData = new FormData();
      /* aquí iría un formData.append por cada campo de data.
      en lugar de esto, Object.keys de un objeto devuelve un array con los nombres de las propiedades del objeto. 
      Luego, el objeto con ["nombrepropiedad"] devuelve el valor, así que esto es lo que optimiza en lugar de escribir campo a campo*/
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar); //esto es porque avatar en el form se llama distinto, debe llevar el valor fileAvatar.
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;
      return result;

      console.log(data);
    } catch (error) {
      throw error;
    }
  }

  async getUsers(accessToken, active = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}