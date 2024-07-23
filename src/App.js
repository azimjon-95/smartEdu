// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutWrapper from './components/layout/LayoutWrapper';
import { routes } from './routes/Routes';
import Login from './components/login/Login';

function App() {
  return (
    <>
      <Login />
      <Routes>
        <Route element={<LayoutWrapper />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
