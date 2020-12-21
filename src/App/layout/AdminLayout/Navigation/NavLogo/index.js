import React from 'react';
import DEMO from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";
import Esteghlal from './../../../../../assets/icon/Esteghlal';
const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">

                <a href={DEMO.BLANK_LINK} className="b-brand">
                    <div className="b-bg">
                        {/* <i className="feather icon-trending-up" /> */}
                        <Esteghlal fill={'#262626'} />


                    </div>
                    <span className="b-title">استقلال</span>

                </a>

                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
