import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const emailRef = useRef()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setError('')
        setSuccess('')
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccess("Successfully Done")
                }else{
                    alert("Please Verify your email address")
                }
            })
            .catch(error => {
                // console.log(error);
                setError(error.message)
            })

    }
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        console.log(email);
        if (!email) {
            console.log('Please Provide an Email');
            return;
        } else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            console.log("Please wright a provide Email");
        }
        sendPasswordResetEmail(auth, email)
            .then(() =>{
                alert("Please check your email");
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" ref={emailRef} name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            error && <p>{error}</p>
                        }
                        {
                            success && <p>{success}</p>
                        }
                        <p>New to this website ? please <Link className="text-green-600" to='/logout'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;