import React from "react";
import {
    BrowserRouter,
    Route,
    Routes,

} from 'react-router-dom'
import { Spinner } from "react-bootstrap";

// const Home = React.lazy(() => import('../views/home/home'))
// const Recap = React.lazy(() => import('../views/recapAbsent/recapAbsent'))
// const ResetPassword = React.lazy(() => import('../views/resetPassword/resetPassword'))
// const Leave = React.lazy(() => import('../views/leaveManagement/leaveManagement'))
// const User = React.lazy(() => import('../views/createuser/createuser'))
const Not_Found = React.lazy(() => import('../views/notFound/not_found'))
const Users = React.lazy(()=> import('../views/users/users'))
const Login = React.lazy(() => import('../views/login/login'))
const Dashboard = React.lazy( ()=> import('../views/dashboard_user/dashboard') )
const SendReportUser = React.lazy( ()=> import('../views/sendReportUser/sendReportUser')  )
const DashboardAdministrator = React.lazy( ()=> import('../views/dashboard_administrator/dashboard') )
const Mahasiswa = React.lazy( ()=> import('../views/mahasiswa/mahasiswa') )
const Logout = React.lazy( ()=> import('../views/logout/logout'  ) )
const RegisterStudent = React.lazy( ()=> import('../views/register_students/register_students')  )
const Dosen = React.lazy( () => import('../views/dosen/dosen') )


const coreRoutes = [
   
    { path:'/users', exact:false, name: 'users', component:Users },
    { path: '*', exact: false, name: 'Not_found', component: Not_Found },
    { path: '/', exact: true, name: 'Login', component: Login },
    { path: '/home', exact: true, name : 'DashboardUser', component: Dashboard },
    { path: '/send_report', exact: true, name : 'SendReportUser', component: SendReportUser },
    // { path: '/home_administrator', exact: true, name : 'DashboardAdministrator', component: DashboardAdministrator },
    { path: '/mahasiswa', exact: true, name : 'Mahasiswa', component: Mahasiswa },
    { path: '/logout', exact: false, name: 'logout', component: Logout },
    { path: '/registration', exact: false, name: 'registration', component: RegisterStudent },
    { path: '/dosen', exact: false, name: 'dosen', component: Dosen },

    
]


export default function MainRoutes(props) {

    const loading = (
        <div className="d-flex align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading... {console.log("loading")} </span>
            </Spinner>
        </div>
    )

    return (
        <>
            <BrowserRouter>
                <React.Suspense fallback={loading}>
                    <Routes>
                        {
                            coreRoutes.map(
                                route =>
                                    <Route key={route.name} exact={route.exact} path={route.path} name={route.name} element={<route.component />} />

                            )
                        }
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </>
    )

}