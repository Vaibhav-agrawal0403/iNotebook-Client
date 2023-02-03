import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const host = process.env.REACT_APP_BASEURL;
    const [credentials, setCredentials] = useState({name:"", email:"", password:"",showPassword:false})
    let Navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}) 
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            // save the auth token and Redirect
            localStorage.setItem('token', json.authtoken) 
            props.showAlert("Account Created Successfully", "success")
            Navigate("/") // "/" path going to home page, that we've declared in app.js
        }
        else{
            props.showAlert("Invalid credentials", "danger")
        }
    }

    const handleViewPassword = () => {
        setCredentials({
            // ...credentials,
            showPassword: !credentials.showPassword,
        })
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }  

    return (
        <div>
                <div className='text-center mt-5 mb-4'>
                    <h1>iNOTEBOOK <i className="fa-solid fa-book" style={{cursor : 'initial'}}></i></h1>
                    <p><b>Save Your Notes</b></p>
                </div>
                <div className="container-form">
                        <p className="text-center my-3"><i style={{cursor : 'initial'}}>New to iNotebook? 👇Create a new account here! </i></p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 input-container">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name"  
                                onChange={onChange} aria-describedby="emailHelp" />
                            </div> 
                            <div className="mb-4 input-container">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" 
                                onChange={onChange} aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-4 input-container">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                        <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" id="password" name="password"
                                            value={credentials.password} onChange={onChange} minLength={5} required />
                                        
                                        <div className="input-group-text" >
                                            <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} onClick={handleViewPassword}></i>
                                        </div>
                                </div>
                            </div>
                            <div className="text-center">
                                    <button type="submit" className="btn btn-primary">SignUp</button>
                            </div>
                        </form>
                </div>    
        </div>
    )
}

export default Signup