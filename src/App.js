import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LayoutWrapper from './components/layout/LayoutWrapper';
import { routes } from './routes/Routes';
import Login from './components/login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      {isLoggedIn ? (
        <Route element={<LayoutWrapper />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      ) : (
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      )}
      {!isLoggedIn && <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}
    </Routes>
  );
}

export default App;