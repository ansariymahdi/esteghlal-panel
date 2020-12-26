import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
// import { isLoggedIn } from 'utils';
import AuthenticationController from './../controller/AuthenticationController';
import PublicRoutes from './PublicRoutes';
import { isLoggedIn } from './../controller';
/*
* TODO: when user loggedIn he/she unable to goto public routes
*  ie: ('/about', '/contact', 'any other public route')
*/
function Auth() {
	// TODO: temp logged-in check, update as per your app logic
	console.log(isLoggedIn())
	return isLoggedIn() ? (
		<Redirect to="/app" />
	) : (
			<PublicRoutes />
		)
}

export default memo(Auth);
