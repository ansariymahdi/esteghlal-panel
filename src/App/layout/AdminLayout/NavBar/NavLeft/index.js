import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';

import NavSearch from './NavSearch';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";
import { withRouter } from 'react-router-dom'
import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

class NavLeft extends Component {
    state = {
        listOpen: false,
        isOpen: false

    };
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    logout = () => {
        console.log(this.props)
        localStorage.removeItem('token');
        this.props.history.push("/");
    }
    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        let navItemClass = ['nav-item'];
        if (this.props.windowWidth <= 575) {
            navItemClass = [...navItemClass, 'd-none'];
        }
        let dropdownRightAlign = false;
        if (this.props.rtlLayout) {
            dropdownRightAlign = true;
        }
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;


        return (
            <Aux>
                <ul className="navbar-nav mr-auto ">
                    <li><a href={DEMO.BLANK_LINK} className="full-screen" onClick={this.props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a></li>
                    {/* <li className={navItemClass.join(' ')}>
                        <Dropdown alignRight={dropdownRightAlign}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                Dropdown
                            </Dropdown.Toggle>
                            <ul>
                                <Dropdown.Menu>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>Action</a></li>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>Another action</a></li>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>Something else here</a></li>
                                </Dropdown.Menu>
                            </ul>
                        </Dropdown>
                    </li> */}

                    <li>
                        <div className="dropdown drp-user direction-rtl" onClick={this.toggleOpen} >
                            <i className="icon feather icon-settings" />
                            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile" />
                                    <span> پدرام حسینی</span>
                                    <a className="dud-logout" title="Logout" onClick={() => this.logout()}>
                                        <i className="feather icon-log-out" />
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings" /> تنظیمات</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-user" /> نمایه</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail" /> پیام ها</a></li>
                                    {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock" /> Lock Screen</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </li>
                    {/* <li className="nav-item"><NavSearch /></li> */}
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.isFullScreen,
        rtlLayout: state.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavLeft));
