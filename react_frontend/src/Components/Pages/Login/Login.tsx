import { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(): JSX.Element {
  const [userName, setName] = useState("");
  const [userPass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const myURL = "http://localhost:4000/api/user/checkLogin";

  const makeLogin = () => {
    const data = {
      user_name: userName,
      password: userPass,
    };

    if (userPass.length < 4) {
      setErrorMessage("Password must be at least 4 characters"); // Set error message for password length requirement
      return;
    }

    axios
      .post(myURL, data)
      .then((response) => {
        console.log(response.data);

        const { message, user_type, user_code } = response.data;

        if (message === "ok") {
          // Store the user_type and user_code in localStorage
          localStorage.setItem("user_type", user_type);
          localStorage.setItem("user_code", user_code); 

          if (user_type === "admin") {
            navigate("/MainLayout");
          } else {
            navigate("/vacations");
          }
        } else if (message === "invalid_credentials") {
          setErrorMessage("Incorrect username or password"); 
        } else {
          setErrorMessage("Incorrect username or password"); 
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        setErrorMessage(" Incorrect username or password"); 
      });
  };

  return (
    <div style={{ marginTop: 100 }}>
      <div className="Box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="enter user name"
          onChange={(args) => setName(args.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="enter user password"
          onChange={(args) => setPass(args.target.value)}
          required
        />
        <br />
        <br />
        <input type="button" value="login" onClick={makeLogin} />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
        <p>
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
