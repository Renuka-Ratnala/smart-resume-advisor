import { useState } from "react";
import ResumeAnalyzer from "./ResumeAnalyzer";
import Register from "./Register";

function Login() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                 "https://smart-resume-advisor.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const message = await response.text();

            if (response.ok) {

                alert(message);
                setLoggedIn(true);

            } else {

                alert(message);

            }

        } catch (err) {

            alert("Login Failed");

        }

    };

    if (loggedIn) {
        return <ResumeAnalyzer />;
    }

    if (showRegister) {
        return (
            <Register
                goToLogin={() => setShowRegister(false)}
            />
        );
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>🚀 Smart Resume Advisor</h1>

                <p className="subtitle">
                    Welcome Back
                </p>

                <p className="small-text">
                    Sign in to continue your journey
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <div className="password-container">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="forgot">
                    Forgot Password?
                </p>

                <p className="register">
                    Don't have an account?
                    <span
                        onClick={() => setShowRegister(true)}
                    >
                        {" "}Register
                    </span>
                </p>

            </div>

        </div>

    );
}

export default Login;