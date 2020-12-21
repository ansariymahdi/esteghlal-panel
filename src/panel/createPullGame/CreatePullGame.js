import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table, Collapse } from 'react-bootstrap';
import { validateEmpty } from './../../App/components/formValidator/FormValidator'
import Aux from "../../hoc/_Aux";
import DatePicker from 'react-modern-calendar-datepicker';
import ImageUpload from './../../App/components/imageUpload/ImageUpload'
import InputLabel from './../../App/components/inputLabel/InputLabel'
import { connect, useDispatch } from 'react-redux';
import { String } from "./../../common"
import * as actionTypes from "./../../store/actions";
import { useToasts } from 'react-toast-notifications'
import { useSelector } from "react-redux";
import { PullGame } from './../../services'
import TimePicker from 'rc-time-picker';
import { withRouter } from 'react-router-dom'
import InputConstants from './../../constants/InputConstants'
import moment from 'moment';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE_POLL';

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
            console.log(key + updatedFormIsValid);
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};
const CreatePullGame = props => {
    const { addToast } = useToasts()
    const token = useSelector(state => state.authReducer.token);
    const member = useSelector(state => state.authReducer.memberData);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState();
    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState(new moment());
    const [selectedOption, setSelectedOption] = useState(null);
    const [files, setFiles] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [polls, setPolls] = useState([]);
    const [activeIndex, setActiveIndex] = useState(true);
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(
        formReducer,
        {
            inputValues: {
                pollName: '',
                stadiumName: '',
                leagueName: '',
                pointGame: '',
                firstTeam: '',
                lastTeam: '',
                description: '',
            },
            inputValidities: {
                pollName: false,
                stadiumName: false,
                leagueName: false,
                firstTeam: false,
                lastTeam: false,
                description: false,
            },
            formIsValid: false,
        },
    );
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            // console.log('formi' + inputValue);
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState],
    );

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
    }

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    useEffect(() => {
        console.log("mohsen chav")
        getPullGame()
    }, []);
    const getPullGame = () => {
        props.onShowLoader();
        PullGame.getAllPullGame(token).subscribe(
            (response) => {
                console.log(response); // again, no need to 'response.data'
                props.onShowLoader();
                setPolls(response.data);


            },
            (err) => {
                // setIsLoading(false);
                console.log(err);
            },
        );

    }

    const addFile = file => {
        console.log(file);
        setFiles({
            files: file.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
        }
        )
    }
    const handleValueChange = value => {
        // console.log(value && value.format('HH:mm:ss'));
        setStartTime(value)
    };
    // const submitHandler = () => {
    //     console.log("form" + formSubmitted)
    //     if (!formSubmitted) {
    //         setFormSubmitted(true);
    //         // setFormSubmitted(prods => ({ ...prods, [formSubmitted]: true }));
    //     }

    //     if (!formState.formIsValid) {
    //         console.log(formState.formIsValid)
    //         return;
    //     }
    //     try {
    //         props.onShowLoader();
    //         onSubmitPull(formState.inputValues);

    //     } catch (err) {
    //         props.onShowLoader();
    //     }


    // };
    const submitHandler = useCallback(async () => {
        console.log(formSubmitted);

        if (!formSubmitted) {
            setFormSubmitted(true);
            return;
        }
        if (!formState.formIsValid) {
            // console.log(formState.formIsValid)
            // setIsLoading(false)
            console.log('heeeeeeeeeeeelllllllll');
            return;
        }
        try {
            props.onShowLoader();
            onSubmitPull(formState.inputValues);
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, formState]);
    const onSubmitPull = (data) => {



        const pullGame = {
            "creatorUserName": "",
            "organizationName": "",
            "pollType": 1,
            "name": data.pollName,
            "instruction": "string",
            "startDate": "2020-12-06T09:43:35.383Z",
            "endDate": "2020-12-06T09:43:35.384Z",
            "pollSections": [
                {
                    "id": 0,
                    "subHeading": data.stadiumName,
                    "title": data.leagueName,
                    "isRequired": true,
                    "sortOrder": 0,
                    "descriptivePoint": data.pointGame,
                    "questions": [
                        {
                            "id": 0,
                            "title": data.firstTeam + "-" + data.lastTeam,
                            "description": data.description,


                            "questionType": 1,
                            "allowMultipleAnswers": true,
                            "sortOrder": 0
                        }
                    ]
                }
            ]
        }
        PullGame.postInsertPullGame(token, pullGame).subscribe(
            (response) => {
                console.log(response); // again, no need to 'response.data'
                props.onShowLoader();
                // setPolls(response.data);
                addToast(String.your_poll_insert_successfully, {
                    appearance: 'success',
                    autoDismiss: true,
                })

            },
            (err) => {
                // setIsLoading(false);
                console.log(err);
            },
        );

    }
    return (
        <Aux>
            <div className="row direction-rtl">
                <div className="col">
                    <div className="card">
                        {/* <Collapse isOpened={activeIndex}>
                            <div
                                className={{
                                    show: activeIndex ? 'show' : null,
                                    hide: !activeIndex ? 'hide' : null,
                                }}
                            >
                                <a>[YOUR COLLAPSE CONTENT]</a>
                            </div>
                        </Collapse> */}
                        <div className="card-header" onClick={() => {
                            console.log(activeIndex)
                            setActiveIndex(!activeIndex)
                        }}>
                            <h5 className="card-title">ثبت نظر سنجی</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">

                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="pollName"
                                        label={String.name_pull}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"pullName"}
                                        type={InputConstants.TEXT}
                                        placeholder={String.enter_pull_name}
                                        initialValue={formState.inputValues.pollName}
                                        initiallyValid={formState.inputValidities.pollName}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />
                                </div>
                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="stadiumName"
                                        label={String.stadium_name}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"email"}

                                        type={InputConstants.TEXT}
                                        placeholder={String.enter_stadium_name}
                                        initialValue={formState.inputValues.stadiumName}
                                        initiallyValid={formState.inputValidities.stadiumName}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />
                                </div>
                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="leagueName"
                                        label={String.league_name}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"email"}
                                        type={InputConstants.TEXT}

                                        placeholder={String.enter_league_name}
                                        initialValue={formState.inputValues.leagueName}
                                        initiallyValid={formState.inputValidities.leagueName}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />
                                </div>

                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="pointGame"
                                        label={String.game_points}
                                        type={InputConstants.NUMBER}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"email"}
                                        placeholder={String.enter_game_points}
                                        initialValue={formState.inputValues.pointGame}
                                        initiallyValid={formState.inputValidities.pointGame}
                                        formSubmitted={formSubmitted}
                                        required
                                        // positive
                                        onInputChange={inputChangeHandler} />
                                </div>


                            </div>

                            <div className="row mb-1 mt-3">
                                <div className="col-3 text-right" >
                                    <label class="mb-1">
                                        <h6 class="mb-0 text-sm form-label" >{String.start_poll_date}</h6>
                                    </label >


                                    <DatePicker
                                        value={selectedDay}
                                        onChange={setSelectedDay}
                                        shouldHighlightWeekends
                                        locale="fa" // add this
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-3 text-right" >
                                    <label class="mb-1">
                                        <h6 class="mb-0 text-sm form-label" >{String.start_poll_time}</h6>
                                    </label >


                                    <TimePicker
                                        time="01:00"

                                        placeholder="انتخاب زمان"
                                        value={startTime}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="col-3 text-right" >
                                    <label class="mb-1">
                                        <h6 class="mb-0 text-sm form-label" >{String.end_poll_date}</h6>
                                    </label >


                                    <DatePicker
                                        value={selectedDay}
                                        onChange={setSelectedDay}
                                        shouldHighlightWeekends
                                        locale="fa" // add this
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-3 text-right" >
                                    <label class="mb-1">
                                        <h6 class="mb-0 text-sm form-label" >{String.end_poll_time}</h6>
                                    </label >


                                    <TimePicker
                                        time="01:00"

                                        placeholder="انتخاب زمان"
                                        value={startTime}
                                        onChange={handleValueChange}
                                    />
                                </div>

                            </div>
                            <div class="row mb-1 mt-3">

                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="firstTeam"
                                        label={String.name_first_team}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"firstTeam"}
                                        type={InputConstants.TEXT}
                                        placeholder={String.enter_first_team_name}
                                        initialValue={formState.inputValues.pollName}
                                        initiallyValid={formState.inputValidities.pollName}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />
                                </div>
                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="lastTeam"
                                        label={String.name_second_team}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"lastTeam"}

                                        type={InputConstants.TEXT}
                                        placeholder={String.enter_second_team_name}
                                        initialValue={formState.inputValues.lastTeam}
                                        initiallyValid={formState.inputValidities.lastTeam}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />
                                </div>
                                <div className="col-3 text-right">
                                    <InputLabel
                                        id="description"
                                        label={String.description}
                                        // errorText={Strings.please_enter_your_mobile_number}
                                        name={"description"}
                                        type={InputConstants.TEXT}

                                        placeholder={String.enter_description_name}
                                        initialValue={formState.inputValues.description}
                                        initiallyValid={formState.inputValidities.description}
                                        formSubmitted={formSubmitted}
                                        required
                                        onInputChange={inputChangeHandler} />
                                </div>



                            </div>

                            <div class="row">
                                <div className="col-3 text-right">
                                    <button type="button" class="mt-2 btn btn-success" onClick={() => submitHandler()}>{String.accept}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row direction-rtl">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">لیست نظرسنجی ها</h5></div><div class="card-body"><div class="table-responsive">
                                <table class="table text-right">
                                    <thead>
                                        <tr>
                                            <th>ردیف</th>
                                            <th>نام نظرسنجی</th>
                                            <th>بازی</th>
                                            <th>امتیاز</th>
                                            <th>زمان شروع بازی</th>
                                            <th>زمان پایان بازی</th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {polls.map((item, index) => (
                                            <tr>
                                                <th >{index + 1}</th>
                                                <td>{item?.name}</td>
                                                <td>{item?.pollSections[0]?.questions[0]?.title}</td>
                                                <td>{item?.pollSections[0]?.questions[0]?.descriptivePoint}</td>
                                                <td>{item?.startDate}</td>
                                                <td>{item?.endDate}</td>
                                                <td>     <ul className=" mr-auto list-inline">
                                                    <li class="list-inline-item"><a><i className="feather icon-edit-2" /></a></li>
                                                    <li class="list-inline-item"><a><i className="feather icon-trash-2" /></a></li>
                                                </ul>

                                                </td>
                                            </tr>

                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Aux>


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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePullGame));
