import * as React from 'react';
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../assets/images/logo.png";
import {FaUserAlt} from "react-icons/fa";
import {ImSearch} from "react-icons/im";
import {ImCart} from "react-icons/im";


const options = {
  burgerColor: "#eb4034",
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "#fff",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Дом",
  link2Text: "Продукты",
  link3Text: "Контакты",
  link4Text: "Информация",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  profileIcon:true,
  ProfileIconElement:FaUserAlt,
  searchIcon:true,
  SearchIconElement:ImSearch,
  cartIcon:true,
  CartIconElement:ImCart,
};


const Header = () => {
    return (
        <ReactNavbar {...options}/>
    );
};

export default Header;