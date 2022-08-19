import './styles/globalStyles.scss';
import Header from "./components/ui/Header/Header";
import {BrowserRouter as Router} from "react-router-dom";


function App() {
    return (
        <Router>
            <Header/>
        </Router>
    );
}

export default App;
