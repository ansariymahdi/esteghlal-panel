import ServerConstants from "../constants/ServerConstants";
// import AuthenticationService from "./Authentication.service";
import { String } from "./../common";
const HandleError = {
  catchError: (staus) => {
    return new Promise((resolve, reject) => {
      switch (staus) {
        case ServerConstants.NOT_FOUND:
          //  showSnackBar(String.username_password_incorrect, 2)
          const errorObject = {
            msg: "خطا",
            messageToShow: String.username_password_incorrect,
            //   data, //...some data we got back
          };
          console.log(errorObject);
          resolve(errorObject);
          break;
        case ServerConstants.SERVER_ERROR:
          //  showSnackBar(String.internal_server_error, 2)
          break;
        case ServerConstants.SERVICE_NOT_ACCESS:
          //  showSnackBar(String.internal_server_error, 2)
          break;
        case ServerConstants.SERVICE_NOT_SUPPORTED:
          //  showSnackBar(String.internal_server_error, 2)
          break;
        case ServerConstants.EXPIRED_TOKEN:
          // AuthenticationService.logout().then((value) => {
          //   if (value == true) {
          //     console.log('khodafex');
          //     // props.navigation.dispatch(
          //     //   CommonActions.reset({
          //     //     index: 0,
          //     //     routes: [{name: 'Login'}],
          //     //   }),
          //     // );
          //   }
          // });

          const errorObject2 = {
            msg: "خطا",
            messageToShow: String.username_password_incorrect,
            //   data, //...some data we got back
          };
          //   console.log(errorObject2);
          reject(errorObject2);
          break;
      }
      //   if (somethingSuccesfulHappened) {
      //     const successObject = {
      //       msg: 'Success',
      //       data, //...some data we got back
      //     };
      //     resolve(successObject);
      //   } else {
      //     const errorObject = {
      //       msg: 'An error occured',
      //       error, //...some error we got back
      //     };
      //     reject(errorObject);
      //   }
    });
  },
};

export default HandleError;
