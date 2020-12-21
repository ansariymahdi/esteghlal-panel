import React from 'react';

const Login = React.lazy(() => import('./panel/login/Login'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const ErrorPage = React.lazy(() => import('./panel/errorNotFoundPage/ErrorNotFoundPage'));

const route = [
    { path: '/auth/login', exact: true, name: 'Signup 1', component: Login },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/notFound', exact: true, name: 'error', component: ErrorPage }
];

export default route;