import { API_URL } from "@/constants/Apiurl";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default class APIService {
  apiUrl: AxiosInstance;
  appHost: string;

  constructor() {
    if (process.env.EXPO_PUBLIC_BACKEND_SERVER_URL) {
      this.appHost = API_URL;
    } else {
      this.appHost = API_URL;
    }
    this.apiUrl = APIService.getAxiosInstance({
      baseURL: `${this.appHost}`,
    });
  }

  static getAxiosInstance(config?: CreateAxiosDefaults): AxiosInstance {
    return axios.create(config);
  }
}
