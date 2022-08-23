import * as React from 'react'
import {useEffect} from "react";
import Header from "./components/ui/Header/Header";
import WebFont from 'webfontloader';
import Footer from "./components/ui/Footer/Footer";
import {Routes,Route} from 'react-router-dom'
import Home from "./components/ui/Home/Home";


function App() {

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka']
            }
        })
    }, [])

    return (
        <Routes>
            {/*<Header/>*/}
            <Route exact path={'/'} element={<Home/>}/>
            {/*<Footer/>*/}
        </Routes>
    );
}

export default App;
