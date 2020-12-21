export const SET_DATA = 'SET_DATA';
export const SET_NOTIFICATION_KEY = 'SET_NOTIFICATION_KEY';

export const setDataAll = (memberData, token, notificationKey = null) => {
    return { type: SET_DATA, memberData: memberData, token: token };
};
export const setData = (memberData, token, notificationKey = null) => {
    return { type: SET_DATA, memberData: memberData, token: token };
};

export const setNotificationKey = (notificationKey) => {
    return { type: SET_NOTIFICATION_KEY, notificationKey: notificationKey };
};