import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import MainLayout from './Components/Layout/MainLayout/MainLayout';
import Page404 from './Components/Pages/Page404/Page404';
import Vacations from './Components/Pages/Vacations/Vacations';
import AddVacation from './Components/Pages/AddVacation/AddVacation';
import VacationForm from './Components/Pages/AddVacation/AddVacation';
import Report from './Components/Pages/Report/Report';
import EditVacation from './Components/Pages/EditVacation/EditVacation';

function App(this: any) {
  
    return (
 
        <div className="MainRoute">
            <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/Mainlayout" element={<MainLayout/>}/>
        <Route path="/vacations" element={<Vacations/>}/>
        <Route path="/addvacation" element={<VacationForm/>}/>
        <Route path="/report" element={<Report/>}/>
        <Route path="/editvacation/:holidayCode" element={<EditVacation/>}/>
        <Route path="*" element={<Page404/>}/>
        
            </Routes>
			
        </div>
  
    );

}

export default App;
/*
<div>
<nav className="navbar navbar-expand navbar-dark bg-dark">
  <Link to={"/"} className="navbar-brand">
    bezKoder
  </Link>
  <div className="navbar-nav mr-auto">
    <li className="nav-item">
      <Link to={"/home"} className="nav-link">
        Home
      </Link>
    </li>

    {showModeratorBoard && (
      <li className="nav-item">
        <Link to={"/mod"} className="nav-link">
          Moderator Board
        </Link>
      </li>
    )}

    {showAdminBoard && (
      <li className="nav-item">
        <Link to={"/admin"} className="nav-link">
          Admin Board
        </Link>
      </li>
    )}

    {currentUser && (
      <li className="nav-item">
        <Link to={"/user"} className="nav-link">
          User
        </Link>
      </li>
    )}
  </div>

  {currentUser ? (
    <div className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to={"/profile"} className="nav-link">
          {currentUser.username}
        </Link>
      </li>
      <li className="nav-item">
        <a href="/login" className="nav-link" onClick={this.logOut}>
          LogOut
        </a>
      </li>
    </div>
  ) : (
    <div className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link to={"/register"} className="nav-link">
          Sign Up
        </Link>
      </li>
    </div>
  )}
</nav>

<div className="container mt-3">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/user" element={<BoardUser />} />
    <Route path="/mod" element={<BoardModerator />} />
    <Route path="/admin" element={<BoardAdmin />} />
  </Routes>
</div>

{ /*<AuthVerify logOut={this.logOut}/> */
