
import App from "../App";
import AppConstants from "./../constants/AppConstants";
export default class AuthenticationController {
    // static async logout() {
    //     try {
    //         await AsyncStorage.removeItem('@id_token');
    //         await AsyncStorage.removeItem('@member_data');
    //         console.log("truelogout")
    //         return true;
    //     } catch (error) {
    //         // error reading value
    //         console.log('AsyncStorage Error: ' + error.message);
    //         return false;
    //     }
    // }

    // static async isLoggedIn() {
    //     const authToken = await AsyncStorage.getItem('@id_token');
    //     if (authToken != null) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    // static async getToken() {
    //     const authToken = await AsyncStorage.getItem('@id_token');
    //     return authToken;
    // };
    // static async getMemberData() {
    //     const memberData = await AsyncStorage.getItem('@member_data');
    //     return memberData;
    // };

    static async getTokenAndMemberData() {
        const authToken = await localStorage.getItem(AppConstants.TOKEN);
        const memberData = await localStorage.getItem(AppConstants.USER_NAME);
        return { token: authToken, memberData: memberData };
    };
}
