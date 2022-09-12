import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import '../../../styles/styles.css'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [emailEl, setEmail] = useState('');
    const [passwordEl, setPassword] = useState('');
    const [fullnameEl, setFullName] = useState('');
    const [erroremail, setErroremail] = useState(null);
    const [errorpassword, setErrorpassword] = useState(null);
    const [errorname, setErrorname] = useState(null);

    const navigate = useNavigate();
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function isValidFullName(name) {
        if (/^(?=.*[a-zA-Z])/.test(name)) {
            return !(/^(?=.*[0-9])/.test(name));
        }
        return false;
    }
    function isValidPassword(password) {
        if (password.length < 8) return false;
        else
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password);
    }
    const handleChangeemail = event => {
        if (!isValidEmail(event.target.value)) {
            setErroremail('Email is invalid');
        } else {
            setErroremail(null);
        }

        setEmail(event.target.value);
    };
    const handleChangename = event => {
        if (!isValidFullName(event.target.value)) {
            setErrorname('Full Name is invalid');
        } else {
            setErrorname(null);
        }

        setFullName(event.target.value);
    };
    const handleChangepassword = event => {
        if (!isValidPassword(event.target.value)) {
            setErrorpassword('Password is invalid length 8 need to have at least 1 Upercase LowerCase and numbers');
        } else {
            setErrorpassword(null);
        }

        setPassword(event.target.value);
    };

    return (
        <section className="book" id="register-from">

            <h1 className="heading">
                <span>r</span>
                <span>e</span>
                <span>g</span>
                <span>i</span>
                <span>s</span>
                <span>t</span>
                <span>e</span>
                <span>r</span>

                <span className="space"></span>
                <span>f</span>
                <span>o</span>
                <span>r</span>
                <span>m</span>
            </h1>
            <div className="row">
                <div className="image">
                    <img src="images/register-img.png" alt="" />
                </div>
                <div className='side'>
                    <form action="">
                        <div className="inputBox">
                            <h3>Full Name</h3>
                            <input name="fullname" id="fullname" type="text" placeholder="enter full name here...." value={fullnameEl} onChange={handleChangename} />
                        </div>
                        <div className="inputBox">
                            <h3>Email</h3>
                            <input id="email" name="email" type="email" placeholder="enter email here..." value={emailEl} onChange={handleChangeemail} />
                        </div>
                        <div className="inputBox">
                            <h3>Password</h3>
                            <input id="password" name="password" type="password" className="box" placeholder="enter password here..." value={passwordEl} onChange={handleChangepassword} />
                        </div>
                        {erroremail && <h2 style={{ color: 'red' }}>{erroremail}</h2>}
                        {errorname && <h2 style={{ color: 'red' }}>{errorname}</h2>}
                        {errorpassword && <h2 style={{ color: 'red' }}>{errorpassword}</h2>}
                        <button className="btn" id="btn" type="button" onClick={async () => {
                            if (!errorpassword && !erroremail && !errorname)
                                if (!emailEl || !passwordEl || !fullnameEl) { setErroremail("Fill form") }
                                else {
                                    const user = { fullname: fullnameEl, email: emailEl, password: passwordEl };
                                    const registerURL = "http://localhost:3001/api/users/createUser";
                                    const response = await fetch(registerURL, {
                                        method: "post",
                                        headers:
                                        {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(user),
                                    });
                                    const content = await response.json();
                                    if (content["fullname"]) {
                                        alert("User added");
                                        const cookies = new Cookies();
                                        cookies.set(content["role"], content["fullname"], { path: "/" });
                                        navigate("/");

                                    }
                                    else { alert("Email " + content["msg"]); }
                                }
                        }}>Sigup</button>
                    </form>
                    <div className="not-found">
                        <h3>Already a member?</h3>
                        <h3 className='clickableText' onClick={() => { navigate('/Login'); window.scrollTo(0, 0) }}>Log in</h3>
                    </div>
                </div>
            </div>
        </section>)
}
