import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import * as actionTypes from "./../store/actions";
import * as authActionTypes from "./../store/auth.action";
import { withRouter } from 'react-router-dom';
import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import LoaderProgress from './components/loaderProgress/LoaderProgress'
import AuthenticationController from './../controller/AuthenticationController'
import './../assets/scss/style.scss';
const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});



class App extends Component {


    setData = () => {
        AuthenticationController.getTokenAndMemberData().
            then((data) => {
                console.log(data);

                // const newResult = { ...JSON.parse(data.memberData) }
                // const tok = { ...JSON.parse(data.token) }
                this.props.onSetData(data.token)
                // props.navigation.dispatch(
                //     CommonActions.reset({
                //         index: 0,
                //         routes: [{ name: "Home" }],
                //     })
                // );
            })
    }
    render() {
        console.log(this.props)
        const menu = routes.map((route, index) => {

            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });


        this.setData();

        return (

            <Aux>


                <ScrollToTop>

                    <Suspense fallback={<Loader />}>
                        {
                            this.props.showLoader &&
                            <LoaderProgress />
                        }
                        <Switch>

                            {menu}
                            <Route path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>


            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        collapseMenu: state.reducer.collapseMenu,
        showLoader: state.reducer.showLoader
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onShowLoader: () => dispatch({ type: actionTypes.SHOW_LOADER }),
        onSetData: (token) => dispatch({ type: authActionTypes.SET_DATA, token }),

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
