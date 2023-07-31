import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import Vacations from "../../Pages/Vacations/Vacations";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Page404 from "../../Pages/Page404/Page404";
import AddVacation from "../../Pages/AddVacation/AddVacation";

function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
            <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/Mainlayout" element={<MainLayout/>}/>
        <Route path="/vacations" element={<Vacations/>}/>
        <Route path="/addvacation" element={<AddVacation/>}/>
        <Route path="*" element={<Page404/>}/>
        
            </Routes>
			
        </div>
    );
}

export default MainRoute;
