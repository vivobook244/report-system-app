import { faCalendarCheck , faGauge, faCalendarDays, faIdCard, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default [

    {   
        name: 'Home',
        to: '/Home',
        icon: faGauge,
    },
    {   
        name: 'Item Terkirim',
        to: '/send_report',
        icon: faGauge,
    },
    {   
        name: 'Pengguna',
        to: '/users',
        icon: faGauge,
    },
    {   
        name: 'Mahasiswa',
        to: '/Mahasiswa',
        icon: faGauge,
    },
    {   
        name: 'Dosen',
        to: '/dosen',
        icon: faGauge,
    },
    {   
        name: 'Logout',
        to: '/logout',
        icon: faSignOut,
    },

]