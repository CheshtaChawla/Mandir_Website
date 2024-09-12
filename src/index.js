// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// // import reportWebVitals from './reportWebVitals';
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements ,BrowserRouter as Router,  Routes, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './dbConfig/db'; 

// import Login from './component/admin/Login'; 
// import Logout from './component/admin/Logout'; 

// import Home from './component/Home/Home';
// import AdminComponent from '../src/component/admin/AdminComponent';
// import AdminEventComponent from './component/admin/AdminEventComponent';
// import AdminCharityComponent from './component/admin/AdminCharityComponent';
// import AdminBookingComponent from './component/admin/AdminBookingComponent';
// import AdminCommitteeComponent from './component/admin/AdminCommitteeComponent';
// import AdminAboutUsComponent from './component/admin/AdminAboutUsComponent';
// import AdminContactUsComponent from './component/admin/AdminContacUsComponent';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//     // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       setIsAuthenticated(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const router = createBrowserRouter(
//     [
//       {
//         path: "/login",
//         element: !isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/admin" />
//       },
//       {
//         path: "/logout",
//         element: <Logout onLogout={() => setIsAuthenticated(false)} />
//       },
//       {
//         path: "/",
//         element: <Home />
//       },
//       {
//         path: "/admin",
//         // element: isAuthenticated ? <AdminComponent /> : <Navigate to="/login" />
//         element: <AdminComponent  />
//       },
//       {
//         path: "/admin/event",
//         // element: isAuthenticated ? <AdminEventComponent /> : <Navigate to="/login" />
//         element: <AdminEventComponent />
//       },
//       {
//         path: "/admin/charity",
//         // element: isAuthenticated ? <AdminCharityComponent /> : <Navigate to="/login" />
//         element: <AdminCharityComponent/>
//       },
//       {
//         path: "/admin/booking",
//         // element: isAuthenticated ? <AdminBookingComponent /> : <Navigate to="/login" />
//         element: <AdminBookingComponent />
//       },
//       {
//         path: "/admin/committee",
//         // element: isAuthenticated ? <AdminBookingComponent /> : <Navigate to="/login" />
//         element: <AdminCommitteeComponent />
//       },
//       {
//         path: "/admin/contactUs",
//         // element: isAuthenticated ? <AdminBookingComponent /> : <Navigate to="/login" />
//         element: <AdminContactUsComponent />
//       },
//       {
//         path: "/admin/aboutUs",
//         // element: isAuthenticated ? <AdminBookingComponent /> : <Navigate to="/login" />
//         element: <AdminAboutUsComponent />
//       },
      
//     ]
//   );

//   return <RouterProvider router={router} />;
// };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate, BrowserRouter as Router } from 'react-router-dom';

import Login from './component/admin/Login'; 
import Logout from './component/admin/Logout'; 
import Home from './component/Home/Home';
import AdminComponent from './component/admin/AdminComponent';
import AdminEventComponent from './component/admin/AdminEventComponent';
import AdminCharityComponent from './component/admin/AdminCharityComponent';
import AdminBookingComponent from './component/admin/AdminBookingComponent';
import AdminCommitteeComponent from './component/admin/AdminCommitteeComponent';
import AdminAboutUsComponent from './component/admin/AdminAboutUsComponent';
import AdminContactUsComponent from './component/admin/AdminContacUsComponent';
import { ProtectedRoute } from './component/admin/login-logoutProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const router = createBrowserRouter([
    // {
    //   path: "/login",
    //   element: !isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/admin" />,
    // },
    {
      path: "/login",
      element:<Login onLogin={() => setIsAuthenticated(true)} /> ,
    },
    {
      path: "/logout",
      element: <Logout onLogout={() => setIsAuthenticated(false)} />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/event",
      element: (
        <ProtectedRoute>
          <AdminEventComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/charity",
      element: (
        <ProtectedRoute>
          <AdminCharityComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/booking",
      element: (
        <ProtectedRoute>
          <AdminBookingComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/committee",
      element: (
        <ProtectedRoute>
          <AdminCommitteeComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/contactUs",
      element: (
        <ProtectedRoute>
          <AdminContactUsComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/aboutUs",
      element: (
        <ProtectedRoute>
          <AdminAboutUsComponent />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
