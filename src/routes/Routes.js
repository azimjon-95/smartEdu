import { Outlet } from 'react-router-dom';

import Register from '../page/reception/register/Register';
// import Students from './page/students/Students';
import NewGrupps from '../page/reception/newGrupps/NewGrupps';
import CreateCards from '../page/reception/createCards/CreateCards';
import StudentList from '../page/reception/studentList/StudentList';
import ActiveGroups from '../page/reception/activeGroups/ActiveGroups';
import CreateTeacher from '../page/owner/createTeacher/CreateTeacher';
import TeachersTable from '../page/owner/createTeacher/ReadTeacher';
import PayController from '../components/payController/PayController';
import Balans from '../page/owner/balans/Balans';
import Single_page from '../components/workersSinglePage/WorkersSinglePage';
import Students from '../page/reception/activeGroups/students';

export const routes = [
    { path: '/register/:id', element: <Register /> },
    { path: '/createCards', element: <CreateCards /> },
    { path: '/reports', element: <NewGrupps /> },
    { path: '/activeGroups', element: <ActiveGroups /> },
    { path: '/createTeacher', element: <CreateTeacher /> },
    { path: '/getTeacher', element: <TeachersTable /> },
    { path: '/payController', element: <PayController /> },
    { path: '/balans', element: <Balans /> },
    { path: '/single_page', element: <Single_page /> },
    { path: '/studentList/:id', element: <StudentList /> },
    { path: '/students/:id', element: <Students /> },

    { path: '/', element: <Outlet /> },
];