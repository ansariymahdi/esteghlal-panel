import { ServerConstants, AppConstants } from "./../constants";
// import AuthenticationService from "./Authentication.service";
import { String } from "./../common";
let errorObject = {
  msg: '',
  messageToShow: '',
  //   data, //...some data we got back
};
const HandleError = {
  catchError: (error, fromRoute) => {
    return new Promise((resolve, reject) => {

      const status = error.response.status;
      switch (status) {
        case ServerConstants.NOT_FOUND:
          //  showSnackBar(String.username_password_incorrect, 2)
          errorObject = {
            msg: 'خطا',
            messageToShow: String.not_found,
            //   data, //...some data we got back
          };
          console.log(errorObject);
          resolve(errorObject);
          break;
        case ServerConstants.BAD_REQUEST:
          //  showSnackBar(String.username_password_incorrect, 2)
          let text = "";
          if (fromRoute === AppConstants.FROM_LOGIN) {
            text = String.username_password_incorrect;
          } else {
            text = String.internal_server_error
          }
          errorObject = {
            msg: 'خطا',
            messageToShow: text,
            //   data, //...some data we got back
          };

          console.log(errorObject);
          resolve(errorObject);
          break;
        case ServerConstants.SERVER_ERROR:
          errorObject = {
            msg: 'خطا',
            messageToShow: String.internal_server_error,
            //   data, //...some data we got back
          };
          resolve(errorObject);
          break;
        case ServerConstants.SERVICE_NOT_ACCESS:
          errorObject = {
            msg: 'خطا',
            messageToShow: String.internal_server_error,
            //   data, //...some data we got back
          };
          resolve(errorObject);
          //  showSnackBar(String.internal_server_error, 2)
          break;
        case ServerConstants.SERVICE_NOT_SUPPORTED:
          errorObject = {
            msg: 'خطا',
            messageToShow: String.internal_server_error,
            //   data, //...some data we got back
          };
          resolve(errorObject);
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
            msg: 'خطا',
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
