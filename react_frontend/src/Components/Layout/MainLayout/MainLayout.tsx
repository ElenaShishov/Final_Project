import Vacations from "../../Pages/Vacations/Vacations";
import MainRoute from "../../Routing/MainRoute/MainRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
             <header>
                <Header />
            </header>
            <main>
            <Vacations/>
            </main>
            <aside>
                <Menu />
            </aside> 
            <footer>
                <Footer />
            </footer>
			
        </div>
    );
}

export default MainLayout;
