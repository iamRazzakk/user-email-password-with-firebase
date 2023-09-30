import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
    const [registerError, setregisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.Password.value;
        const Accept = e.target.terms.checked;
        console.log(email, password);
        setregisterError('')
        setSuccess('')
        if (password.length < 6) {
            setregisterError("Password should be at least 6 characters")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setregisterError("Your password should 1 uppercase")
            return;
        }
        else if (!Accept) {
            setregisterError("Please accept your terms and condition")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess("User Created successfully")
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>{
                    console.log("Profile Updated");
                })
                .catch()
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("please check your email and verify your account")
                    })
            })
            .catch(error => {
                // console.log(error);
                setregisterError(error.message)
            })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h1 className='text-3xl mb-2'>Please register</h1>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-full py-4 px-3" type="text" name="name" id="" placeholder="Enter your name" required /><br />
                    <input className="mb-4 w-full py-4 px-3" type="email" name="email" id="" placeholder="Email" required /><br />
                    <div className="relative mb-4">
                        <input
                            className="mb-2 w-full py-4 px-3"
                            type={showPassword ? "text" : "password"} name="Password"
                            id="" placeholder="Password" />
                        <span className="absolute top-4 right-2" onClick={() => {
                            setShowPassword(!showPassword)
                        }}>{
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }</span> <br />
                        <div className="mb-2">
                            <input type="checkbox" name="" id="terms" />
                            <label className="ml-2" htmlFor="terms">Accept out <a href="">Terms and condition</a></label>
                        </div>
                        <br />
                        <input type="submit" className="btn btn-success w-full" value="Register" />
                    </div>
                </form>
                {registerError && <p>{registerError}</p>}
                {
                    success && <p>{success}</p>
                }
                <p>Already have an account? <Link className="text-green-600" to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
