import React, { useState, useEffect, useCallback, useReducer } from 'react';

import Aux from "../../hoc/_Aux";
import { String } from "./../../common"








const CreateGame = props => {

    return (

        <div className="row direction-rtl">
            <div className="col">
                <div className="card">
                    <div className="card-header" >
                        <h5 className="card-title">{String.add_game}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                        </div>
                    </div>
                </div>

            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
