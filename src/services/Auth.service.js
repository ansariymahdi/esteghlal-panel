/**
 * Created by InspireUI on 01/03/2017.
 * An API for JSON API Auth Word Press plugin.
 * https://wordpress.org/plugins/json-api-auth/
 *
 * @format
 */

import { AppConfig } from "./../common";
import { Rxios } from "./ApiClient.service";
// import { request, error } from "./../Omni";
// import axios from 'axios';

const baseUrl = AppConfig.ApiConfig.baseUrl;
// const isSecured = url.startsWith("https");
// const secure = isSecured ? "" : "&insecure=cool";
// const cookieLifeTime = 120960000000;
const rxios = new Rxios();
//   let headers = new Headers();

// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');

// headers.append('Origin','http://localhost:3000');
const Auth = {
  login: (model) => {
    return rxios.post(`${baseUrl}auth/token`, model);
  },
};

export default Auth;
