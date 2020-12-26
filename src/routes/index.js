import React, { memo } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import history from 'utils/history';
import PrivateRoutes from './PrivateRoutes';
import Auth from './Auth';
import { isLoggedIn } from './../controller';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import * as actionTypes from "./../store/actions";
import LoaderProgress from './../App/components/loaderProgress/LoaderProgress'
function Routes(props) {
	console.log(isLoggedIn())
	return (
		// <Router history={createBrowserHistory()}>
		// 	{/* {
		// 		props.showLoader &&
		// 		<LoaderProgress />
		// 	} */}
		<div>
			{
				props.showLoader &&
				<LoaderProgress />
			}
			<Switch>
				<Route path="/app">
					<PrivateRoutes />
				</Route>
				<Route path="">
					<Auth />
				</Route>
			</Switch>
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
		onShowLoader: () => dispatch({ type: actionTypes.SHOW_LOADER }),

	}
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(Routes));

