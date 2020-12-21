import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import { String } from "./../../common"
import MobileLoginBro from './../../assets/icon/MobileLoginBro'
import Logo from './../../assets/images/logo.png'
import LoginIcon from './../../assets/images/login.png'
// import Login from './../../assets/images/login.jpg'
import InputLabel from './../../App/components/inputLabel/InputLabel'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { AuthService } from './../../services'
import { setLoginAuth } from './../../store/localeStorage/LocaleStorage'
import { connect } from 'react-redux';
import { setData } from './../../store/auth.action';
import * as actionTypes from "./../../store/actions";
import axios from 'axios'
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

    const dispatch = useDispatch();
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
            formIsValid: true,
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
    const { history } = props;
    const onSubmitLogin = () => {
        props.onShowLoader();
        console.log(formState.inputValues);
        const formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('client_id', 'sse_gateway');
        formData.append('username', formState.inputValues.username);
        formData.append('password', formState.inputValues.password);

        AuthService.login(formData).subscribe(
            (response) => {
                console.log(response); // again, no need to 'response.data'

                setLoginAuth(response.access_token, formState.inputValues.username);
                setAuthData(formState.inputValues.username, response.access_token);
                props.onShowLoader();
                history.push("/menu/dashboard");



                // DeviceStorage.storeStringData('@id_token', response.access_token);

                // setAuthData(data, response.access_token);
                // setIsLoading(false);
                // console.log(response.data);
                // props.navigation.dispatch(
                //     CommonActions.reset({
                //         index: 0,
                //         routes: [{ name: 'Home' }],
                //     }),
                // );
            },
            (err) => {
                // setIsLoading(false);
                console.log(err);
            },
        );

        // axios({
        //     method: 'post',
        //     url: `http://46.224.6.83:8000/auth/token`,
        //     data: formData,

        // }).then(response => {
        //     // If request is good...
        //     console.log(response.data);
        // })
        //     .catch((error) => {
        //         console.log('error ' + error);
        //     });;
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
                                        onInputChange={inputChangeHandler} />

                                </div>
                                <div>
                                    <InputLabel
                                        id="password"
                                        label={String.password}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"password"}
                                        placeholder={String.enter_password}
                                        initialValue={formState.inputValues.password}
                                        initiallyValid={formState.inputValidities.password}
                                        onInputChange={inputChangeHandler} />
                                </div>

                                <div class="row px-3 mb-4">
                                    <div class="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input" />
                                        <label for="chk1" class="custom-control-label text-sm"> مرا به خاطر بسپار</label> </div>
                                    {/* <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a> */}
                                </div>
                                <div class="row mb-3 px-3 "> <button type="submit" class="btn btn-blue text-center" onClick={() => onSubmitLogin()}>ورود</button> </div>
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
        </Aux>
        // <Aux>
        //     <div class="bubble"></div>
        //     <div class="bubble"></div>
        //     <div class="bubble"></div>
        //     <div class="bubble"></div>
        //     <div class="bubble"></div>
        //     <div class="main">
        //         {/* <div className="card"> */}
        //         {/* <div className="card-body text-center">    */}
        //         <Logo width={150} height={150} />
        //         {/* </div> */}
        //         {/* </div> */}
        //         <div className="card">
        //             <div className="card-body text-center">
        //                 <div>
        //                     <div className="mb-4">
        //                         {/* <i className="feather icon-unlock auth-icon" /> */}

        //                     </div>
        //                     <h3 className="mb-4">ورود</h3>
        //                     <div class="text-right  mb-4">
        //                         <Form.Label >نام کاربری</Form.Label>
        //                         <Form.Control type="email" className="form-control" placeholder="tom mohajeri" />
        //                     </div>
        //                     <div className="text-right  mb-4">
        //                         <Form.Label >گذرواژه</Form.Label>
        //                         <Form.Control type="password" className="form-control" placeholder="*******" />

        //                     </div>
        //                     <div className="form-group text-right">
        //                         <div className="checkbox checkbox-fill d-inline">
        //                             <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
        //                             <label htmlFor="checkbox-fill-a1" className="cr"> مرا به خاطر بسپار</label>


        //                         </div>
        //                     </div>
        //                     <button className="btn btn-primary shadow-2 mb-4">{String.accept}</button>
        //                 </div>

        //                 {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
        //                          <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
        //             </div>
        //         </div>
        //     </div>
        // </Aux>
    )
}
// class Login extends React.Component {
//     render() {
//         return (
//             <Aux>
//                 <div class="bubble"></div>
//                 <div class="bubble"></div>
//                 <div class="bubble"></div>
//                 <div class="bubble"></div>
//                 <div class="bubble"></div>
//                 <div class="main">
//                     <div className="card">
//                         <div className="card-body text-center">
//                             <div>
//                                 <div className="mb-4">
//                                     <i className="feather icon-unlock auth-icon" />
//                                 </div>
//                                 <h3 className="mb-4">ورود</h3>
//                                 <div class="text-right  mb-4">
//                                     <Form.Label >نام کاربری</Form.Label>
//                                     <Form.Control type="email" className="form-control" placeholder="tom mohajeri" />
//                                 </div>
//                                 <div className="text-right  mb-4">
//                                     <Form.Label >گذرواژه</Form.Label>
//                                     <Form.Control type="password" className="form-control" placeholder="*******" />

//                                 </div>
//                                 <div className="form-group text-right">
//                                     <div className="checkbox checkbox-fill d-inline">
//                                         <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
//                                         <label htmlFor="checkbox-fill-a1" className="cr"> مرا به خاطر بسپار</label>


//                                     </div>
//                                 </div>
//                                 <button className="btn btn-primary shadow-2 mb-4">{String.accept}</button>
//                             </div>

//                             {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
//                                  <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
//                         </div>
//                     </div>
//                 </div>
//             </Aux>
//             // <Aux>
//             //     <Breadcrumb />
//             //     <div className="auth-wrapper">
//             //         <div className="auth-content">
//             //             <div className="auth-bg">
//             //                 <span className="r" />
//             //                 <span className="r s" />
//             //                 <span className="r s" />
//             //                 <span className="r" />
//             //             </div>
//             //             <div className="card">
//             //                 <div className="card-body text-center">
//             //                     <div className="mb-4">
//             //                         <i className="feather icon-unlock auth-icon" />
//             //                     </div>
//             //                     <h3 className="mb-4">ورود</h3>
//             //                     <div class="text-right  mb-4">
//             //                         <Form.Label >نام کاربری</Form.Label>
//             //                         <Form.Control type="email" className="form-control" placeholder="tom mohajeri" />
//             //                     </div>
//             //                     <div className="text-right  mb-4">
//             //                         <Form.Label >گذرواژه</Form.Label>
//             //                         <Form.Control type="password" className="form-control" placeholder="*******" />

//             //                     </div>
//             //                     <div className="form-group text-right">
//             //                         <div className="checkbox checkbox-fill d-inline">
//             //                             <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
//             //                             <label htmlFor="checkbox-fill-a1" className="cr"> مرا به خاطر بسپار</label>


//             //                         </div>
//             //                     </div>
//             //                     <button className="btn btn-primary shadow-2 mb-4">{String.accept}</button>
//             //                     {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
//             //                     <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
//             //                 </div>
//             //             </div>
//             //         </div>
//             //     </div>
//             // </Aux >
//         );
//     }
// }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));