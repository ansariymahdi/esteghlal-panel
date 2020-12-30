import React, { Fragment } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
// import { getAllowedRoutes, isLoggedIn } from 'utils';
import PrivateRoutesConfig from './../routesList';
import MapAllowedRoutes from './MapAllowedRoutes';
import AuthenticationController from './../controller/AuthenticationController';
import { isLoggedIn } from './../controller';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './../App/layout/AdminLayout/Navigation';
import NavBar from './../App/layout/AdminLayout//NavBar';
// import Breadcrumb from './Breadcrumb';
// import Loader from "../Loader";
// import routes from "../../../routes";
// import Aux from "../../../hoc/_Aux";
import './../assets/scss/style.scss';
// import * as actionTypes from "../../../store/actions";
function PrivateRoutes(props) {
	const match = useRouteMatch('/app');
	let allowedRoutes = [];

	if (isLoggedIn()) allowedRoutes = PrivateRoutesConfig;
	else return <Redirect to="/" />;

	console.log(allowedRoutes)

	return (
		<Fragment>
			{/* <Aux> */}
			{/* <Fullscreen enabled={this.props.isFullScreen}> */}
			<Navigation prefix={match.path} />
			<NavBar {...props} />
			<div className="pcoded-main-container"
			// onClick={() => this.mobileOutClickHandler}
			>
				<div className="pcoded-wrapper">
					<div className="pcoded-content">
						<div className="pcoded-inner-content">
							{/* <Breadcrumb /> */}
							<div className="main-body">
								<div className="page-wrapper">
									{/* <Suspense fallback={<Loader />}>
												<Switch>
													{menu}
													<Redirect from="/" to={this.props.defaultPath} />
												</Switch>
											</Suspense> */}

									<MapAllowedRoutes routes={allowedRoutes} basePath="/app" {...props} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </Fullscreen> */}
			{/* </Aux> */}
			{/* <TopNav routes={allowedRoutes} prefix={match.path} className="bg-white" />
			<MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound /> */}
		</Fragment>
	);
}

export default PrivateRoutes;
