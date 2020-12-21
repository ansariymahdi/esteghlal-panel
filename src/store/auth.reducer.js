import { SET_DATA } from './auth.action';

// memberData {
//     profileImage: "member4.jpg"
//     gender: true
//     memberId: "1"
// }

const initialState = {
    memberData: {
        profileImage: '',
        gender: true,
        memberId: '0'
    },
    token: ''
};

const autReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            console.log('====== in Recucer ======');
            console.log(action.memberData);
            console.log(action.token);
            console.log('====== in Recucer ======');

            return {
                ...state,
                memberData: action.memberData,
                token: action.token
            }
        default:
            return state;
    }
};

export default autReducer;
