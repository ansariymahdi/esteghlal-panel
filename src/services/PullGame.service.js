/**
 * Created by InspireUI on 01/03/2017.
 * An API for JSON API Auth Word Press plugin.
 * https://wordpress.org/plugins/json-api-auth/
 *
 * @format
 */

import { AppConfig } from "../common";
import { Rxios } from "./ApiClient.service";
// import { Observable } from "rxjs";
// import { request, error } from "./../Omni";
// import axios from 'axios';

const baseUrl = AppConfig.ApiConfig.baseUrl;
// const isSecured = url.startsWith("https");
// const secure = isSecured ? "" : "&insecure=cool";
// const cookieLifeTime = 120960000000;
// let rxios = new Rxios();
// let service = axios.create({
const rxios = new Rxios();
//   headers: {
//     'Accept': 'application/json'
//   }
// })

const PullGame = {
  // postAnswerPullGame: (token: String, model: any) => {
  //   rxios.setHeader({
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   return rxios.post(`${baseUrl}poll/v1/Answer`, model);
  // },

  getAllPullGame: (token) => {
    rxios.setHeader({
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return rxios.get(`${baseUrl}poll/v1/poll`)

  },
  postInsertPullGame: (token, model) => {
    rxios.setHeader({
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return rxios.post(`${baseUrl}poll/v1/poll`, model)

  },
};

export default PullGame;
