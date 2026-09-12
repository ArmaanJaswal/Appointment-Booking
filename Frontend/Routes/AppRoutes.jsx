import React from 'react'
import { Route, Routes } from 'react-router'
import MainPage from '../pages/MainPage'
import AppointmentForm from '../src/Components/AppointmentForm'
import EditAppointmentForm from '../src/Components/EditAppointmentForm'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/fillDetails' element={<AppointmentForm/>}/>
        <Route path='/edit/:id' element={<EditAppointmentForm/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes