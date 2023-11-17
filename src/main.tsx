import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import './index.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login.tsx'
import CourtInfo from './pages/CourtInfo.tsx'
import NavBar from './components/NavBar.tsx'
import Booking from './pages/Booking.tsx'

import dayjs from "dayjs"
import CustomParseFormat from "dayjs/plugin/customParseFormat"
import BookingsList from './pages/BookingsList.tsx'
dayjs.extend(CustomParseFormat)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/bookings" element={<BookingsList/>}/>
        <Route path="/court/:id" element={<CourtInfo/>}/>
        <Route path="/court/:id/book" element={<Booking/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
