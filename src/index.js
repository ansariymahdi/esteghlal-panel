import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'rc-time-picker/assets/index.css';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import authReducer from './store/auth.reducer';
import config from './config';
import { ToastProvider, useToasts } from 'react-toast-notifications'
const rootReducer = combineReducers({
    reducer: reducer,
    authReducer: authReducer,
});
const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <ToastProvider placement="bottom-left">
            <BrowserRouter>
                {/* basename="/datta-able" */}
                <App />

            </BrowserRouter>
        </ToastProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
