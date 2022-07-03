import React from 'react'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const fetchData = async() => {
        const res = await axios.post("http://localhost:5000/api/auth/login",{
            username,
            password
        },{ withCredentials: true })
        console.log(res)
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("called")
        fetchData()
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
            <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder='password'/>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Login