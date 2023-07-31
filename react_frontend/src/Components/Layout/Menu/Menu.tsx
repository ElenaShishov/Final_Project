import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <h1>Editorial Control Panel :</h1>
			<NavLink to={"/addvacation"}>Add Vacation</NavLink><br/>
            <NavLink to={"/report"}>Report Graph of Followers</NavLink>
        </div>
    );
}

export default Menu;
