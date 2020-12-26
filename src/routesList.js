import React from 'react';

import Dashboard from './panel/dashboard/Dashboard'
import CreatePullGameDefault from './panel/createPullGame/CreatePullGame'
// const DashboardDefault = React.lazy(() => import('./panel/dashboard/Dashboard'));
// const PlayerProgramDefault = React.lazy(() => import('./panel/programPlayer/ProgramPlayer'));
// const CreatePullGameDefault = React.lazy(() => import('./panel/createPullGame/CreatePullGame'));


const routes = [
    { path: '/', exact: true, name: 'Dashboard', component: Dashboard, title: "داشبورد", hasAuth: true },
    // { path: '/menu/playerProgram', exact: true, name: 'PlayerProgramDefault', component: PlayerProgramDefault, hasAuth: true },
    { path: '/createPullGame', name: 'CreatePullGame', component: CreatePullGameDefault, title: "نظر سنجی بازی", hasAuth: true },
    // { path: '/pullGame', name: 'PullGame', component: CreatePullGameDefault, title: "vsv سsبازی", hasAuth: true },

];

export default routes;