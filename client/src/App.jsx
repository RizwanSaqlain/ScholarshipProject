import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import NewHome from './pages/NewHome'
import Home from './pages/Home'
import Register from './pages/Register'
import Entrance from './pages/Entrance'
import Grievance from './pages/Grievance'
import Notifications from './pages/Notifications'

import FormFamilyIncome from './components/FormAddDetails/FormFamilyIncome';
import FormPersonal from './components/FormAddDetails/FormPersonal';
import FormContactDetails from './components/FormAddDetails/FormContactDetails';
import FileUploadComponent from './components/FormAddDetails/FileUpload';

const AppContent = () => {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Conditionally render Nav if the route is not '/' */}
      {location.pathname !== '/' && (
        <>
          <Nav className="font-poppins" />
          <hr />
        </>
      )}

      <Routes>
        <Route path='/' element={<NewHome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/entrance' element={<Entrance />} />
        <Route path='/grievance' element={<Grievance />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/forms/personal' element={<FormPersonal />} />
        <Route path='/forms/contact' element={<FormContactDetails />} />
        <Route path='/forms/family' element={<FormFamilyIncome />} />
        <Route path='/forms/attachments' element={<FileUploadComponent />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
