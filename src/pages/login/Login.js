import React from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const response = await axios.post('/api/user/login', data);

        if (response.data.success) {
            sessionStorage.setItem('token', response.data.token);
            navigate('/messages');
        }
        
    };

    return (
        <div className="login">
            <form>
                <h1>Mailer admin</h1>
                <input ref={emailRef} placeholder='Email' type='text'></input>
                <input ref={passwordRef} placeholder='password' type='password'></input>
                <button onClick={e => loginHandler(e)}>Login</button>
            </form>
        </div>
    )
};

export default Login;