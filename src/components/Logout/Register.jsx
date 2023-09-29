import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Register = () => {
    const [registerError, setregisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.Password.value;
        console.log(email, password);
        setregisterError('')
        setSuccess('')
        if (password.length) {
            setregisterError("Password should be at least 6 characters")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess("User Created successfully")
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
                    <input className="mb-4 w-3/4 py-4 px-3" type="email" name="email" id="" placeholder="Email" required /><br />
                    <input
                        className="mb-4 w-3/4 py-4 px-3"
                        type={showPassword ? "text" : "password"} name="Password"
                        id="" placeholder="Password" /> <span onClick={() => {
                            setShowPassword(!showPassword)
                        }}>{
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }</span> <br />
                    <input type="submit" className="btn btn-success w-3/4" value="Register" />
                </form>
                {registerError && <p>{registerError}</p>}
                {
                    success && <p>{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;
