import { faCalendarCheck , faGauge, faCalendarDays, faIdCard, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default [

    {   
        name: 'Home',
        to: '/Home',
        icon: faGauge,
    },
    {   
        name: 'Sent Response',
        to: '/send_report',
        icon: faGauge,
    },
    {   
        name: 'Users',
        to: '/users',
        icon: faGauge,
    },
    {   
        name: 'Logout',
        to: '/logout',
        icon: faSignOut,
    },

]