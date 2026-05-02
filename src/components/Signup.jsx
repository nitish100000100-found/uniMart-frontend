import style from "./signup.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState([]);
  const navigate = useNavigate();

async function formSub(e) {
    e.preventDefault();
    const newError = [];
    const form = e.target;
    const username = form.username.value.trim().toUpperCase();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.length === 0) newError.push("Your username section is empty");
    if (password.length === 0) newError.push("Your password section is empty");
    if (password !== confirmPassword) newError.push("Passwords don't match");
    if (!emailRegex.test(email)) newError.push("Enter valid Email id");
    if (!/^\d{10}$/.test(phone)) newError.push("Enter valid phone no");
    if (newError.length > 0) {
      setError(newError);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signup`,
        { username, password, email, phone },
      );

      if (res.data.message === "OK") {
        const signinRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/signin`,
          { username, password },
        );

        if (signinRes.data.success) {
          localStorage.setItem("token", signinRes.data.token);
          navigate(`/home/${username}`);
        } else {
          setError([signinRes.data.message]);
        }
      } else {
        setError([res.data.message]);
      }
    } catch (err) {
      setError(["Please Try Again"]);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h1 className={style.title}>Join UniMart</h1>
        <p className={style.subtitle}>Create your account</p>

        <form className={style.form} onSubmit={formSub}>
          {error.length > 0 && (
            <div className={style.errorContainer}>
              <ul className={style.errorList}>
                {error.map((err, index) => (
                  <li key={index} className={style.errorText}>
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input type="text" name="username" placeholder="Enter your username" className={style.input} />
          <input type="password" name="password" placeholder="Enter your password" className={style.input} />
          <input type="password" name="confirmPassword" placeholder="Confirm your password" className={style.input} />
          <input type="email" name="email" placeholder="Enter your email" className={style.input} />
          <input type="tel" name="phone" placeholder="Enter your phone number" className={style.input} />

          <button type="submit" className={style.button}>Sign Up</button>

          <p className={style.bottomText}>
            Already have an account?{" "}
            <Link to="/" className={style.bottomLink}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
