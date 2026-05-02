import { Link, useNavigate } from "react-router-dom";
import style from "./signin.module.css";
import { useState } from "react";
import axios from "axios";

function Signin() {
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  async function formSub(e) {
    e.preventDefault();

    const newError = [];
    const form = e.target;

    const username = form.username.value.trim().toUpperCase();
    const password = form.password.value.trim();

    if (username.length === 0) newError.push("Your username section is empty");

    if (password.length === 0) newError.push("Your password section is empty");

    if (newError.length > 0) {
      setError(newError);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signin`,
        { username, password }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);  
        navigate(`/home/${username}`);
      } else if (res.data.message === "This username doesn't exist") {
        setError(["User Not Found"]);
      } else if (res.data.message === "Wrong Password") {
        setError(["Wrong Password"]);
      } else if (res.data.message === "Database Error") {
        setError(["Connection to database failed"]);
      } else {
        setError(["Some Error occurred"]);
      }
    } catch (err) {
      console.log(err);
      setError(["Backend error"]);
    }
  }

  return (
    <div className={style.outer}>
      <div className={style.inner}>
        <h1 className={style.brand}>UniMart</h1>
        <h2 className={style.title}>Welcome to UniMart</h2>

        <form className={style.form} onSubmit={formSub}>
          {error.length > 0 && (
            <div className={style.errorBox}>
              {error.map((err, index) => (
                <p key={index} className={style.errorText}>
                  {err}
                </p>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Username"
            name="username"
            className={style.input}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className={style.input}
          />

          <button type="submit" className={style.button}>
            Sign In
          </button>
        </form>

        <p className={style.text}>
          You don't have an account?{" "}
          <Link to="/signup" className={style.link}>
            Signup first
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
