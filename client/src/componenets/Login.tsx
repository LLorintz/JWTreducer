import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

type Credentials = {
    username: string;
    password: string;
  }

  type DispatchProps = {
    onLoggedIn: () => void;
  };
  

const Login = ({onLoggedIn}:DispatchProps) => {

    const [credentials,setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    });

    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        // Ellenőrizzük, hogy van-e token a localStorage-ban
        const token = localStorage.getItem('token');
        if (token) {
            // Ha van, akkor automatikusan bejelentkezünk
            onLoggedIn();
            navigate('/accounts');
        }
    }, [onLoggedIn, navigate]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async()=>{
        //preform
       const response = await fetch('http://localhost:3000/login',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }
        )

        const data = await response.json()
        if (data.success == true) {
            const token = data.token
            localStorage.setItem('token', token)
            navigate('/accounts');
            localStorage.setItem('user', credentials.username)
            onLoggedIn()
        }

    }

const handleGetAllAccounts= async () =>{
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:3000/accounts/${credentials.username}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
   
}


const handleGetProfile = async()=>{
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:3000/profile/${credentials.username}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
   
}

  return (
    <div>
        <h2>Login</h2>
        <input type="text" onChange={handleChange} name='username' placeholder='Enter user name...' />
        <input type="password" onChange={handleChange} name='password' placeholder='password ...'/>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGetAllAccounts}>Get All Accounts</button>
        <button onClick={handleGetProfile}>Get profile</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      onLoggedIn: () => dispatch({ type: 'ON_LOGGED_IN' }),
    };
  };
  
  export default connect(null, mapDispatchToProps)(Login);