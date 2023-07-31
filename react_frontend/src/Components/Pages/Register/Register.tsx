import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("regular"); 
  const [isEmailAvailable, setIsEmailAvailable] = useState(true); 
  const navigate = useNavigate();

  const myURL = "http://localhost:4000/api/user/add";
  const emailCheckURL = "http://localhost:4000/api/user/checkEmailAvailability"; 

  const checkEmailAvailability = async (email: string) => {
    try {
      const emailData = { "user_email": email };
      const emailResponse = await axios.post(emailCheckURL, emailData);
      setIsEmailAvailable(emailResponse.data.email_count);
    } catch (error) {
      console.error("Error checking email availability:", error);
    }
  };

  const makeRegister = async () => {
    // Check email availability
    await checkEmailAvailability(userEmail);

    if (!isEmailAvailable) {
      // Email is already in use, do not proceed with registration
      return;
    }
    if (password.length < 4) {
      console.log("Password must be at least 4 characters long.");
      return;
    }

    // Continue with registration if email is available
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const data = {
      "user_name": userName,
      "user_email": userEmail,
      "password": password,
      "user_create": currentDate,
      "user_type": userType,
    };

    axios.post(myURL, data)
      .then(response => {
        const { id, user_type } = response.data; 
        localStorage.setItem('user_code', id); 
        localStorage.setItem('user_type', user_type); 
        console.log(response);
        if (user_type === "admin") {
          navigate("/Mainlayout"); 
        } else {
          navigate("/vacations"); 
        }
      })
      .catch(err => {
        console.log("Oh no...");
        navigate("*");
      });
  };

  return (
    <div style={{ marginTop: 100 }}>
      <div className='Box'>
        <h2>Registration Form</h2>
        <input type="text" placeholder='Enter user name' onChange={(event) => setUserName(event.target.value)} required/><br /><br />
        <input type="text" placeholder='Enter user email' onChange={(event) => setUserEmail(event.target.value)} onBlur={() => checkEmailAvailability(userEmail)} required/><br /><br />
        {!isEmailAvailable && <p style={{ color: "red" }}>Email is already in use. Please choose a different one.</p>}
        <input type="password" placeholder='Enter password' onChange={(event) => setPassword(event.target.value)} required/><br /><br />
        {password.length > 0 && password.length < 4 && <p style={{ color: "red" }}>Password must be at least 4 characters long.</p>}

        <label>
          User Type:
          <select value={userType} onChange={(event) => setUserType(event.target.value)}>
            <option value="regular">Regular User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <br /><br />
        <input type="button" value="Register" onClick={makeRegister} />
        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
