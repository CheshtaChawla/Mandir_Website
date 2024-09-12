import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, BrowserRouter as Router, Routes  } from 'react-router-dom';
import AdminComponent from './AdminComponent';
import AdminEventComponent from "./AdminEventComponent";
import AdminCharityComponent from "./AdminCharityComponent";
import AdminBookingComponent from "./AdminBookingComponent";
import AdminCommitteeComponent from "./AdminCommitteeComponent";
import AdminContactUsComponent from "./AdminContacUsComponent";
import AdminAboutUsComponent from "./AdminAboutUsComponent";

const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    <Route id="adminhero" path= '/admin' element={<AdminComponent />} />
    <Route id="adminevent" path= '/admin/event' element={<AdminEventComponent />} />
    <Route id="admincharity" path= '/admin/charity' element={<AdminCharityComponent />} />
    <Route id="adminbooking" path= '/admin/booking' element={<AdminBookingComponent />} />
    <Route id="admincommittee" path= '/admin/committee' element={<AdminCommitteeComponent />} />
    <Route id="admincontact" path= '/admin/contact' element={<AdminContactUsComponent />} />
    <Route id="adminabout" path= '/admin/about' element={<AdminAboutUsComponent />} />

    </>
  ));
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

  reportWebVitals();
  