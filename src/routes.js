/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'views/Index.js';
import Profile from 'views/examples/Profile';
// import Maps from "views/examples/Maps.js";
import Register from 'views/examples/Register.js';
import Login from 'views/examples/Login.js';
import Tables from 'views/examples/Tables.js';
// import Icons from "views/examples/Icons.js";
import CreateProject from 'views/examples/CreateProject';
import ListDevices from 'views/devices/ListDevices';
import CreateDevice from 'views/devices/CreateDevice';

var routes = [
    {
        path: '/projects',
        name: 'Home',
        icon: 'ni ni-tv-2 text-primary',
        component: Index,
        layout: '/admin',
        menu: true
    },
    {
        path: '/login',
        name: 'Login',
        icon: 'ni ni-key-25 text-info',
        component: Login,
        layout: '/auth',
        menu: false
    },
    {
        path: '/register',
        name: 'Register',
        icon: 'ni ni-circle-08 text-pink',
        component: Register,
        layout: '/auth',
        menu: false
    },
    {
        path: '/projects/:id',
        name: 'User Profile',
        icon: 'ni ni-single-02 text-yellow',
        component: Profile,
        layout: '/admin',
        menu: false
    },
    {
        path: '/createproject',
        name: 'Create Project',
        icon: 'ni ni-single-02 text-yellow',
        component: CreateProject,
        layout: '/admin',
        menu: false
    },
    {
        path: '/listdevices',
        name: 'List Devices',
        icon: 'ni ni-bullet-list-67 text-red',
        component: ListDevices,
        layout: '/admin',
        menu: true
    },
    {
        path: '/createdevice',
        name: 'Create Device',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateDevice,
        layout: '/admin',
        menu: true
    }

    // {
    //   path: "/icons",
    //   name: "Icons",
    //   icon: "ni ni-planet text-blue",
    //   component: Icons,
    //   layout: "/admin"
    // },
    // {
    //   path: "/maps",
    //   name: "Maps",
    //   icon: "ni ni-pin-3 text-orange",
    //   component: Maps,
    //   layout: "/admin"
    // },

    // {
    //   path: "/tables",
    //   name: "Tables",
    //   icon: "ni ni-bullet-list-67 text-red",
    //   component: Tables,
    //   layout: "/admin"
    // },
    // {
    //   path: "/login",
    //   name: "Login",
    //   icon: "ni ni-key-25 text-info",
    //   component: Login,
    //   layout: "/auth"
    // },
    // {
    //   path: "/register",
    //   name: "Register",
    //   icon: "ni ni-circle-08 text-pink",
    //   component: Register,
    //   layout: "/auth"
    // }
];
export default routes;
