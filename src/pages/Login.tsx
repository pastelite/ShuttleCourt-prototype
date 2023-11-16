import React, { useRef } from 'react'
import NavBar from '../components/NavBar'
import {userStore} from "../stores";
import "./Login.scss" 
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let [username, setUsername] = userStore((state) => [state.username, state.setUsername])
  let navigate = useNavigate()

  let formState = useRef<{[key: string]: string}>({
    username: "",
    password: ""
  })

  function updateFormState(e: React.ChangeEvent<HTMLInputElement>) {
    formState.current[e.target.name] = e.target.value
  }

  function submitHandler(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    setUsername(formState.current.username)
    console.log(formState.current)

    navigate('/home')
  }

  return (
    <div>
      <NavBar />
      <h1>Please Login to access application</h1>
      <div className='form-container'>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={updateFormState} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={updateFormState} />
        <button onClick={submitHandler} >Login</button>
      </div>
    </div>
  )
}
