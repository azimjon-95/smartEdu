// App.js
import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Register from './page/reception/register/Register';
// import Students from './page/students/Students';
import GroupInfoComponent from './page/reception/groupInfoComponent/GroupInfoComponent';
import CreateCards from './page/reception/createCards/CreateCards';
import StudentList from './page/reception/studentList/StudentList';
import ActiveGroups from './page/reception/activeGroups/ActiveGroups';
import CreateTeacher from './page/owner/createTeacher/CreateTeacher';
import TeachersTable from './page/owner/createTeacher/ReadTeacher';

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/register/:id" element={<Register />} />
          <Route path="/createCards" element={<CreateCards />} />
          <Route path="/reports" element={<GroupInfoComponent />} />
          <Route path="/activeGroups" element={<ActiveGroups />} />
          <Route path="/createTeacher" element={<CreateTeacher />} />
          <Route path="/getTeacher" element={<TeachersTable />} />
          <Route path="/studentList/:id" element={<StudentList />} />
          <Route path="/" element={<Outlet />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
