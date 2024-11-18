import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default class APIService {
  apiUrl: AxiosInstance;
  appHost: string;

  constructor() {
    if (process.env.EXPO_PUBLIC_BACKEND_SERVER_URL) {
      this.appHost = "https://be.crowdy.chat/api/v1";
    } else {
      this.appHost = "https://be.crowdy.chat/api/v1";
    }
    this.apiUrl = APIService.getAxiosInstance({
      baseURL: `${this.appHost}`,
    });
  }

  static getAxiosInstance(config?: CreateAxiosDefaults): AxiosInstance {
    return axios.create(config);
  }
}
