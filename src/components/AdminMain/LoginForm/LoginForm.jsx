import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { loginAdmin } from '../../../reducers/adminReducer'
import './LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginAdmin({
      username,
      password,
    }))
  }

  return (
    <div className="loginpage">
      <div className="loginform">
        <h2>Log in to Admin Application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="Username"
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              label="Password"
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id="login-button" variant="contained" color="primary" type="submit">
            login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
