import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const baseURL = 'http://localhost:5000/api/users/login';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        axios.post(baseURL, user)
            .then(res => {
                toast.success('Login Succesful');
                localStorage.setItem('authToken', res.data.token);
                setFormData({
                    email: '',
                    password: '',
                })
                if (res.data.userType == "2") {
                    navigate('/addProduct')
                } else {
                    navigate('/cart')
                }
            }
        )
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else if (err.request) {
                    toast.error("No response received from the server");
                } else {
                    toast.error("An error occurred while processing the request")
                }
            }
        )
    }
    return <>

        <section className='heading'>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Login and start shopping</p>
        </section>

        <section className="form">

            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="text" className="form-control" id='email'
                        name='email' value={email} placeholder='Enter your email' onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id='password'
                        name='password' value={password} placeholder='Enter your password' onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>

            </form>
        </section>
    </>
}

export default Login