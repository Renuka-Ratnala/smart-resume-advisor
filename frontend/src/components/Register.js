import { useState } from "react";

function Register({goToLogin}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                 "https://smart-resume-advisor.onrender.com/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const message = await response.text();

            alert(message);

            if (response.ok) {
                goToLogin();
            }
        } catch (err) {

            alert("Registration Failed");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>🚀 Smart Resume Advisor</h1>

                <p className="subtitle">
                    Create Account
                </p>

                <form onSubmit={handleRegister}>

                    <label>Name</label>

                    <input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Enter Name"
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />

                    <button
                        className="login-btn"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;