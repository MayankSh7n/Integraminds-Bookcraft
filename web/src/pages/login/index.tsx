// import axios from "axios";
// import { useState } from "react";
// import { setTokenAndRedirect } from "../common";
// import React from "react";
// import { loginService } from "@/services";

// import "./style.css";
// import { Link } from "react-router-dom";
// import { showToast } from "@/utils/toast";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     const input = { email, password };

//     const { status, cls, msg, payload } = await loginService(input);

//     showToast(msg, cls);

//     if (!status) {
//       return;
//     }

//     setTimeout(() => {
//       setTokenAndRedirect(payload);
//     }, 2000);
//   };

//   return (
//     <div className="login-form">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <p className="text-secondary text-center">
//           Welcome back! Login to your account to access the dashboard.
//         </p>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button className="login-btn" type="submit">
//           Login
//         </button>

//         <Link className="forgot-password-link" to="/forget-password">
//           Forgot Password?
//         </Link>
//       </form>
//     </div>
//   );
// };

// const LoginPage = () => {
//   return (
//     <main className="login-page">
//       <LoginForm />
//     </main>
//   );
// };

// export default LoginPage;


import axios from "axios";
import { useState } from "react";
import { setTokenAndRedirect } from "../common";
import React from "react";
import { loginService } from "@/services";

import "./style.css";
import { Link } from "react-router-dom";
import { showToast } from "@/utils/toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const input = { email, password };

    const { status, cls, msg, payload } = await loginService(input);

    showToast(msg, cls);

    if (!status) {
      return;
    }

    setTimeout(() => {
      setTokenAndRedirect(payload);
    }, 2000);
  };

  // Google login handler
  const handleGoogleLogin = () => {
    // Replace this with your Flask endpoint for Google login
    window.location.href = "http://localhost:5000/login/google"; 
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className="text-secondary text-center">
          Welcome back! Login to your account to access the dashboard.
        </p>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

        <Link className="forgot-password-link" to="/forget-password">
          Forgot Password?
        </Link>

        {/* Divider or a separator for social login */}
        <div className="social-login-divider">
          <hr />
          <p>or</p>
        </div>

        {/* Google Login Button */}
        <button className="google-login-btn" type="button" onClick={handleGoogleLogin}>
          <img src="/path-to-google-logo.png" alt="Google Logo" className="google-logo" />
          Login with Google
        </button>
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <main className="login-page">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
