import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import './index.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login.tsx'
import CourtInfo from './pages/CourtInfo.tsx'
import NavBar from './components/NavBar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/court/:id" element={<CourtInfo/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
