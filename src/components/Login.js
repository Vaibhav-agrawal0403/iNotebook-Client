import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


function Login(props) {
    const host = process.env.REACT_APP_BASEURL
    const [credentials, setCredentials] = useState({ email: "", password: "", showPassword: false })
    let Navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth token and Redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logged in Successfully", "success")
            Navigate("/") // "/" path going to home page, that we've declared in app.js
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const handleViewPassword = () => {
        setCredentials({
            showPassword: !credentials.showPassword,
        })
    }
    // function myFunction () {
    //     var x = document.getElementById("password");
    //     if (x.type === "password") {
    //       x.type = "text";
    //     } else {
    //       x.type = "password";
    //     }
    // }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <div className='text-center mt-5 mb-4'>
                <h1>iNOTEBOOK <i className="fa-solid fa-book" style={{cursor : 'initial'}}></i></h1>
                {/* <h1>iNOTEBOOK</h1> */}
                <p><b>Save Your Notes</b></p>
            </div>

            <div className="container form">
                <p className='text-center'><i style={{cursor : 'initial'}}>Login to continue to iNotebook👇</i></p>
                <div className="mb-4 input-container">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email}
                        onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-4 input-container">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                            <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" id="password" name="password"
                                value={credentials.password} onChange={onChange} />
                            
                            <div className="input-group-text" >
                                <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} onClick={handleViewPassword}></i>
                            </div>
                    </div>
                </div>

            </div>
            <div className='text-center'>
                <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </div>
            <p className='text-center last-para mt-3'>Don't have an account? <a href="/signup">SignUp-&gt;</a> </p>
        </div>
    )
}

export default Login