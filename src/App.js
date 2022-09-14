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
import LoginSignUp from "./components/ui/User/Login/LoginSignUp";
import {userActions} from "./store/reducers/user/actions";
import {useDispatch, useSelector} from "react-redux";
import UserOptions from "./components/ui/UserOptions/UserOptions";


function App() {

    const {isAuth, user} = useSelector((state) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka']
            }
        })
        dispatch(userActions.loadUser())
    }, [])

    return (
        <>
            {isAuth && <UserOptions user={user}/>}
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/product/:id'} element={<ProductDetails/>}/>
                    <Route path={'/products'} element={<Products/>}/>
                    <Route path={'/products/:keyword'} element={<Products/>}/>
                    <Route path={'/search'} element={<Search/>}/>
                    <Route path={'/login'} element={<LoginSignUp/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
