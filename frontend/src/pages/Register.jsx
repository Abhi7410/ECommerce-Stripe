import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const baseURL = 'http://localhost:5000/api/users';


function Register() {

    const [formData, setFormData] = useState({
        userType: '',
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const navigate = useNavigate
    const { userType, name, email, password, password2 } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const newUser = {
                userType,
                name,
                email,
                password,
            };
            axios.post(baseURL, newUser)
                .then(res => {
                    console.log(newUser);
                    toast.success('Registration Succesful');
                    setFormData({
                        userType: "0",
                        name: '',
                        email: '',
                        password: '',
                        password2: '',
                    })
                    navigate('/login')
                })
                .catch(err => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else if (err.request) {
                        toast.error("No response received from the server");
                    } else {
                        toast.error("An error occurred while processing the request")
                    }
                })
        }
    }
    return <>

        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <select className="form-control" id="userType" name="userType" value={userType} onChange={onChange}>
                        <option value="0">Select User Type</option>
                        <option value="1">Customer</option>
                        <option value="2">Seller</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id='name'
                        name='name' value={name} placeholder='Enter your name' onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id='email'
                        name='email' value={email} placeholder='Enter your email' onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password'
                        name='password' value={password} placeholder='Enter your password' onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password2'
                        name='password2' value={password2} placeholder='Confirm password' onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>

            </form>
        </section>
    </>
}

export default Register