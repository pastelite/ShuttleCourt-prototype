import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
