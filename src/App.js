import * as React from 'react'
import {useEffect} from "react";
import WebFont from 'webfontloader';
import {Routes, Route} from 'react-router-dom'
import Home from "./components/ui/Home/Home";
import Layout from "./components/ui/Layout/Layout";
import './styles/styles.scss'
import ProductDetails from "./components/ui/ProductDetails/ProductDetails";
import Products from "./components/ui/Products/Products";
import Search from "./components/ui/Search/Search";




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
            <Route element={<Layout/>}>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/product/:id'} element={<ProductDetails/>}/>
                <Route path={'/products'} element={<Products/>}/>
                <Route path={'/products/:keyword'} element={<Products/>}/>
                <Route path={'/search'} element={<Search/>}/>
            </Route>
        </Routes>
    );
}

export default App;
