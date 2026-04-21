import axios from "axios";
import JwtService from "./jwt.service";
import config from "@/ConfigProvider";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const ApiService = {
  init() {
    // Inisialisasi instance axios untuk API pertama
    this.api1 = wrapper(
      axios.create({
        baseURL: config.value("API_URL"),
      }),
    );

    // Set header untuk kedua instance
    this.setHeader();
  },

  setHeader() {
    this.api1.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;

    // this.api2.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return this.api1.get(resource, { params });
    // .catch((error) => {
    //   throw new Error(`ApiService ${error}`);
    // });
  },

  async get(resource, params) {
    if (params && params.session) {
      const cookieJar = new CookieJar();
      return this.api1.get(`${resource}`, {
        jar: cookieJar,
        // withCredentials: true,
        params,
      });
      // .catch((error) => {
      //   throw new Error(`ApiService ${error}`);
      // });
    } else {
      return this.api1.get(`${resource}`, { params });
      // .catch((error) => {
      //   const err = new Error(`ApiService ${error}`);
      //   err.code = error.response.status;
      //   throw err;
      // });
    }
  },

  post(resource, params) {
    return this.api1.post(`${resource}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  postJson(resource, params) {
    return this.api1.post(`${resource}`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  upload(resource, params) {
    let formData = new FormData();
    formData.append("file", params);
    return this.api1.post(`${resource}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(resource, slug, params) {
    return this.api1.put(`${resource}/${slug}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  put(resource, params) {
    return this.api1.put(`${resource}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  patch(resource, params) {
    return this.api1.patch(`${resource}`, params);
  },

  delete(resource) {
    return this.api1.delete(resource).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;
