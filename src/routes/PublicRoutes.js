import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { Login, Register, ForgotPassword, LandingPage } from 'components';
import Login from './../panel/login/Login'
function PublicRoutes() {
	return (
		<Fragment>
			<Switch>

				<Route path="/login">
					<Login />
				</Route>
				<Route path="">
					<Login />
				</Route>
			</Switch>
		</Fragment>
	)
}

export default PublicRoutes;
