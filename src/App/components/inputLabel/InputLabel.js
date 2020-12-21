import React, { useState, useRef, useEffect, useReducer } from 'react';

// import ShowIcon from "./../../assets/icons/show.svg";
// import HideIcon from "./../../assets/icons/hide.svg";
// import Close from "./../../assets/icons/cancel.svg";
import { String } from "./../../../common";
// import { Typography } from "./../../styles";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            console.log("man")
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

const InputLabel = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });
    let inputBackColor = 'transparent';
    const [hasErrors, setHasErrors] = useState({
        required: false,
        email: false,
        min: false,
        max: false,
        minLength: false,
        matchPassword: false,
    });

    const { onInputChange, id, onSubmitEditing } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = e => {
        // console.log("AMn ch konam" + e?.target?.value);
        // console.log(onInputChange);

        let text = e?.target?.value;
        // if (props.textChangeListener) {
        //     props.textChangeListener(text);
        // }

        // const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const mobileRegex = /^[0][9][1][0-9]{8,8}$/;
        let isValid = true;
        if (props.required && text?.trim().length === 0 || typeof (text) == "undefined") {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    minLength: false,
                    max: false,
                    min: false,
                    required: true,
                    matchPassword: false,
                })
            });
            isValid = false;
        } else if (isValid) {
            setHasErrors((prevState) => {
                return ({
                    email: false,
                    minLength: false,
                    max: false,
                    min: false,
                    required: false,
                    matchPassword: false,
                })
            });
        }
        // else if (props.email && !emailRegex.test(text.toLowerCase())) {
        //     //('email error');
        //     setHasErrors((prevState) => {
        //         return ({
        //             minLength: false,
        //             max: false,
        //             min: false,
        //             required: false,
        //             email: true,
        //             matchPassword: false,
        //         })
        //     });
        //     isValid = false;
        // }
        // else if (props.mobile && !mobileRegex.test(text.toLowerCase())) {
        //     //('email error');
        //     setHasErrors((prevState) => {
        //         return ({
        //             minLength: false,
        //             max: false,
        //             min: false,
        //             required: false,
        //             mobile: true,
        //             matchPassword: false,
        //         })
        //     });
        //     isValid = false;
        // }
        // else if (props.min != null && +text < props.min) {
        //     //('min error');
        //     setHasErrors((prevState) => {
        //         return ({
        //             email: false,
        //             minLength: false,
        //             max: false,
        //             required: false,
        //             min: true,
        //             matchPassword: false,
        //         })
        //     });
        //     isValid = false;
        // }
        // else if (props.max != null && +text > props.max) {
        //     //('max error');
        //     setHasErrors((prevState) => {
        //         return ({
        //             email: false,
        //             minLength: false,
        //             min: false,
        //             required: false,
        //             max: true,
        //             matchPassword: false,
        //         })
        //     });
        //     isValid = false;
        // }
        // else if (props.minLength != null && text.length < props.minLength) {
        //     //('minLength error');
        //     setHasErrors((prevState) => {
        //         return ({
        //             email: false,
        //             max: false,
        //             min: false,
        //             required: false,
        //             minLength: true,
        //             matchPassword: false,
        //         })
        //     });
        //     isValid = false;
        // }
        // // //(isValid);
        // else if (isValid) {
        //     setHasErrors((prevState) => {
        //         return ({
        //             email: false,
        //             minLength: false,
        //             max: false,
        //             min: false,
        //             required: false,
        //             matchPassword: false,
        //         })
        //     });
        // }

        if (!props.required) {
            //('this is not required and is valid');
            onInputChange(id, inputState.value, true);
            isValid = true;
        }

        // if (props.checkMatchPassword && isValid) {
        //     if (props.matchPassword !== text) {
        //         setHasErrors((prevState) => {
        //             return ({
        //                 email: false,
        //                 minLength: false,
        //                 max: false,
        //                 min: false,
        //                 required: false,
        //                 matchPassword: true,
        //             })
        //         });
        //         isValid = false;
        //     } else {
        //         setHasErrors((prevState) => {
        //             return ({
        //                 email: false,
        //                 minLength: false,
        //                 max: false,
        //                 min: false,
        //                 required: false,
        //                 matchPassword: false,
        //             })
        //         });
        //         isValid = true;
        //     }
        // }

        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
        // onInputChange(id, inputState.value, inputState.isValid);
    };

    useEffect(() => {
        textChangeHandler(inputState.value)
    }, [])


    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    const [isFocused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showClose, setShowClose] = useState(false)

    // const _animatedIsFocused = useRef(new Animated.Value(inputState.value === '' ? 0 : 1)).current;
    // const _animatedHasValue = useRef(new Animated.Value(inputState.value === '' ? 0 : 1)).current;


    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        setFocused(false);
        dispatch({ type: INPUT_BLUR });
    }

    useEffect(() => {
        // Animated.timing(_animatedIsFocused, {
        //     toValue: (isFocused || inputState.value !== '') ? 1 : 0,
        //     duration: 100,
        //     useNativeDriver: false,
        // }).start();

        // Animated.timing(_animatedHasValue, {
        //     toValue: (!isFocused && inputState.value !== '') ? 1 : 0,
        //     duration: 100,
        //     useNativeDriver: false,
        // }).start();
    }, [isFocused]);

    const { label, name, placeholder, type, formSubmitted, ...newprops } = props;
    const lableColor = props.placeHolderColor ? props.placeHolderColor : '#fff';

    // let labelBlurStyle = null
    // if (!isFocused && inputState.value !== '') {
    //     labelBlurStyle = {
    //         color: _animatedHasValue.interpolate({
    //             inputRange: [0, 1],
    //             // outputRange: ['#00BCD4', '#BDBDBD'],
    //             outputRange: ['#396398', lableColor],
    //         }),
    //     };
    // }


    // const labelStyle = {
    //     position: 'absolute',
    //     right: Scale.scale(10),
    //     fontFamily: Typography.FONT_FAMILY_REGULAR,

    //     top: _animatedIsFocused.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [15, -25],
    //     }),
    //     fontSize: _animatedIsFocused.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [Typography.FONT_SIZE_12, Typography.FONT_SIZE_11],
    //     }),
    //     color: _animatedIsFocused.interpolate({
    //         inputRange: [0, 1],
    //         // outputRange: [lableColor, '#00BCD4'],
    //         outputRange: [lableColor, '#396398'],
    //     }),
    // };

    // const borderBottomColorStyle = props.borderColor ? props.borderColor : '#fff';
    // const viewStyle = {
    //     borderColor: _animatedIsFocused.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [borderBottomColorStyle, "#3a89ee"],
    //     }),
    // };

    // let viewBlurStyle = null;
    // if (!isFocused && inputState.value !== '') {
    //     viewBlurStyle = {
    //         borderColor: _animatedHasValue.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: ["#00BCD4", borderBottomColorStyle],
    //         }),
    //     };
    // }

    // let passowrdShowHideIcon = null;
    // if (props.isPassword && props.showTogglePasswordIcon) {
    //     if (showPassword) {
    //         passowrdShowHideIcon = <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}><View style={styles.passwordIcon}><HideIcon height={12} fill={'#000'} /></View></TouchableWithoutFeedback>;
    //     } else {
    //         passowrdShowHideIcon = <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}><View style={styles.passwordIcon}><ShowIcon height={12} fill={'#000'} /></View></TouchableWithoutFeedback>;
    //     }
    // }

    // if (props.isClosable) {
    //     if (inputState.value !== '') {
    //         passowrdShowHideIcon = <TouchableWithoutFeedback><View style={styles.passwordIcon}><Close fill={"#90A4AE"} height={12} /></View></TouchableWithoutFeedback>;
    //     } else {
    //         passowrdShowHideIcon = null;
    //     }
    // }

    // let inputErrorStyle = {};
    // let labelErrorStyle = {};
    // if ((!inputState.isValid && props.formSubmitted)) {
    //     // inputBackColor = '#ffe8e8';
    //     inputErrorStyle = {
    //         // backgroundColor: '#ffaea8',
    //         // borderRadius: 10
    //         borderBottomColor: '#F44336',
    //     };
    //     labelErrorStyle = {
    //         color: '#F44336'
    //     }
    // }
    // if ((!inputState.isValid && inputState.touched) || (!inputState.isValid && props.formSubmitted)) {
    //     inputErrorStyle = {
    //         borderBottomColor: '#F44336',
    //     };
    //     labelErrorStyle = {
    //         color: '#F44336'
    //     }
    // }
    // //(hasErrors);

    // let _renderError = null;
    // if (hasErrors.required && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>{Strings.please_enter_this_field}</Text>
    //     </View>
    // } else if (hasErrors.email && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>{Strings.email_is_incorrect}</Text>
    //     </View>
    // } else if (hasErrors.mobile && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>{Strings.please_enter_your_mobile_number_correctly}</Text>
    //     </View>
    // } else if (hasErrors.min && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>{Strings.must_be_at_least} {props.min} {Strings.was}</Text>
    //     </View>
    // } else if (hasErrors.max && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>Max character size is {props.max}</Text>
    //     </View>
    // } else if (hasErrors.minLength && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>{Strings.must_be_at_least} {props.minLength} {Strings.character} {Strings.was}</Text>
    //     </View>
    // } else if (hasErrors.matchPassword && props.formSubmitted) {
    //     _renderError = <View style={styles.errorContainer}>
    //         {/* <Text style={styles.errorText}>{props.errorText}</Text> */}
    //         <Text style={styles.errorText}>{Strings.match_not_password}</Text>
    //     </View>
    // }
    let _renderError = "";
    if (hasErrors.required && formSubmitted) {
        console.log("Required fields" + props.formSubmitted)
        _renderError = String.please_enter_this_field;

    }

    return (
        <div class="row px-3">
            <label class="mb-1">
                <h6 class="mb-0 text-sm form-label" >{label}</h6>
            </label >
            <input class="form-control" type={type} name={name} placeholder={placeholder}
                //  onChange={(e) => handleInputChange(e)}
                autocomplete="on"
                {...newprops}
                // style={[{
                //     height: Scale.verticalScale(50),
                //     paddingVertical: Scale.moderateScale(4),

                //     textAlign: 'right',
                //     fontSize: Typography.FONT_SIZE_12,
                //     color: (props.editable == false) ? '#fff' : (props.color ? props.color : '#fff'),
                //     paddingHorizontal: Scale.moderateScale(3),
                //     paddingLeft: props.isPassword ? Scale.moderateScale(50) : 3,
                // // }, inputErrorStyle]}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                // onSubmitEditing={onSubmitEditing}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={inputState.value}
                onBlur={handleBlur}

                // blurOnSubmit
                // secureTextEntry={props.isPassword && !showPassword}
                onChange={(e) => textChangeHandler(e)} />
            <label className="input-error">{_renderError}</label>
        </div >
    );
};


export default InputLabel;

