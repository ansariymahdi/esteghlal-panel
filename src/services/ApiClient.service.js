import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from "axios";
import { Observable } from "rxjs";

// export interface RxiosConfig extends AxiosRequestConfig {}

// interface RequestArgs {
//   method: HttpMethod;
//   url: string;
//   queryParams?: object;
//   payload?: object;
// }

const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export class Rxios {
  _httpClient;

  constructor(options) {
    this._httpClient = axios.create(options);
  }
  setHeader(options) {
    this._httpClient = axios.create(options);
  }

  _doReq(args) {
    const { method, url, queryParams, payload } = args;
    let request;
    switch (method) {
      case HttpMethod.GET:
        request = this._httpClient.get(url, { params: queryParams });
        break;
      case HttpMethod.POST:
        request = this._httpClient.post(url, payload);
        break;
      case HttpMethod.PUT:
        request = this._httpClient.put(url, payload);
        break;
      case HttpMethod.PATCH:
        request = this._httpClient.patch(url, payload);
        break;
      case HttpMethod.DELETE:
        request = this._httpClient.delete(url);
        break;

      // default:
      //   throw new Error('Method not supported');
    }
    return new Observable((subscriber) => {
      request
        .then((response) => {
          subscriber.next(response.data);
        })
        .catch((err) => {
          subscriber.error(err);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  get(url, queryParams) {
    return this._doReq({ method: HttpMethod.GET, url, queryParams });
  }

  post(url, payload) {
    return this._doReq({
      method: HttpMethod.POST,
      url,
      payload,
    });
  }

  put(url, payload) {
    return this._doReq({
      method: HttpMethod.PUT,
      url,
      payload,
    });
  }

  patch(url, payload) {
    return this._doReq({
      method: HttpMethod.PATCH,
      url,
      payload,
    });
  }

  delete(url) {
    return this._doReq({
      method: HttpMethod.DELETE,
      url,
    });
  }
}

export const rxios = new Rxios();
