import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Aux from "../../hoc/_Aux";
import { String } from "./../../common"
import MobileLoginBro from './../../assets/icon/MobileLoginBro'
import Logo from './../../assets/images/logo.png'
import LoginIcon from './../../assets/images/login.png'
import InputLabel from './../../App/components/inputLabel/InputLabel'
import { useSelector, useDispatch } from 'react-redux';
import { AuthService, HandleErrorServer } from './../../services'
import { setLoginAuth } from './../../store/localeStorage/LocaleStorage'
import { connect } from 'react-redux';
import { setData } from './../../store/auth.action';
import * as actionTypes from "./../../store/actions";
import { AppConstants } from './../../constants'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from "react-router-dom";


//start code this page 


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            // console.log(key + updatedFormIsValid);
        }

        console.log({
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        })
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};
const Login = (props) => {
    const [inputValues, setInputValues] = useState({ email: "", password: "" })
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { addToast } = useToasts()

    const dispatch = useDispatch();
    let history = useHistory();

    const setAuthData = useCallback((memberData, token) => {
        dispatch(setData(memberData, token))
    }, [dispatch]);
    const [formState, dispatchFormState] = useReducer(
        formReducer,
        {
            inputValues: {
                username: '',
                password: '',
            },
            inputValidities: {
                username: false,
                password: false,
            },
            formIsValid: false,
        },
    );
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            console.log('formi' + inputValue);
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState],
    );
    useEffect(() => {

    }, []);

    const handleInputChange = (event) => {
        const target = event.target;
        // console.log(event.target.name);

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInputValues({
            ...inputValues,
            [name]: value
        })
        // console.log(inputValues);

        // this.setState({
        //     [name]: value
        // });
    }
    const submitHandler = useCallback(async () => {


        if (!formSubmitted) {
            setFormSubmitted(true);
        }
        if (!formState.formIsValid) {
            console.log(formState.formIsValid);
            return;
        }
        try {
            props.onShowLoader();
            onSubmitLogin(formState.inputValues);
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, formState]);
    const onSubmitLogin = (data) => {

        const formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('client_id', 'sse_gateway');
        formData.append('username', data.username);
        formData.append('password', data.password);

        AuthService.login(formData).subscribe(
            (response) => {
                console.log(response); // again, no need to 'response.data'

                setLoginAuth(response.access_token, data.username);
                setAuthData(formState.inputValues.username, response.access_token);
                addToast(String.enter_to_app_successfully, {
                    appearance: AppConstants.SUCCESS_MESSAGE,
                    autoDismiss: true,
                })
                props.onShowLoader();
                history.push("/app");

            },
            (err) => {
                props.onShowLoader();
                // setIsLoading(false);
                console.log(err.response)
                HandleErrorServer.catchError(err, AppConstants.FROM_LOGIN)
                    .then((errs) => {
                        console.log(errs);
                        addToast(errs.messageToShow, {
                            appearance: AppConstants.ERROR_MESSAGE,
                            autoDismiss: true,
                        })
                    })
                    .catch((errs2) => {
                        console.log(errs2);
                    });
            },
        );

    }
    return (
        <Aux>
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto card3 direction-rtl ">
                <div class="card card0 border-0 ">
                    <div class="row d-flex">
                        <div class="col-lg-6">
                            <div class="card1 pb-5">
                                <div class="row"> <img src={Logo} class="logo" /> </div>
                                <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                                    <MobileLoginBro class="image" />

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card2  border-0 px-4 py-5">
                                <div class="row mb-4 px-3">
                                    <h6 class="mb-0 mr-4 mt-2">ورود با</h6>
                                    <div class="facebook text-center mr-3">
                                        <div class="fa fa-facebook"></div>
                                    </div>
                                    <div class="twitter text-center mr-3">
                                        <div class="fa fa-twitter"></div>
                                    </div>
                                    <div class="linkedin text-center mr-3">
                                        <div class="fa fa-linkedin"></div>
                                    </div>
                                </div>
                                <div class="row px-3 mb-4">
                                    <div class="line"></div> <small class="or text-center">یا</small>
                                    <div class="line"></div>
                                </div>
                                <div>
                                    <InputLabel
                                        id="username"
                                        label={String.username}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"email"}
                                        placeholder={String.enter_user_name}
                                        initialValue={formState.inputValues.username}
                                        initiallyValid={formState.inputValidities.username}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />

                                </div>
                                <div>
                                    <InputLabel
                                        id="password"
                                        label={String.password}
                                        type={"password"}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"password"}
                                        placeholder={String.enter_password}
                                        initialValue={formState.inputValues.password}
                                        initiallyValid={formState.inputValidities.password}
                                        formSubmitted={formSubmitted}
                                        onInputChange={inputChangeHandler}
                                        required
                                        isPassword
                                        showTogglePasswordIcon />
                                </div>

                                <div class="row px-3 mb-4">
                                    <div class="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input" />
                                        <label for="chk1" class="custom-control-label text-sm"> مرا به خاطر بسپار</label>
                                        {/* <label for="chk1" class="custom-control-label text-sm" data-testid="counter">1</label>  */}
                                    </div>

                                    {/* <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a> */}
                                </div>
                                <div class="row mb-3 px-3 "> <button type="submit" data-testid="btn-login" class="btn btn-blue text-center w-100" onClick={() => submitHandler()}>ورود</button> </div>
                                {/* <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account? <a class="text-danger ">Register</a></small> </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue py-4 footer">
                        <div class="row px-3"> <small class="mr-4 mr-sm-5 mb-2"> &copy; کلیه حقوق برای های وب محفوظ است</small>
                            <div class="social-contact mr-4 mr-sm-auto ml-4"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 text-sm"></span> </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux >

    )
}

const mapStateToProps = state => {
    return {

        showLoader: state.reducer.showLoader
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onShowLoader: () => dispatch({ type: actionTypes.SHOW_LOADER })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);