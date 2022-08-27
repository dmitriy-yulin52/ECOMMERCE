import {createGlobalStyle} from "styled-components";
import logo from '../assets/images/logo.png'

export const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
}
body {
  cursor: url(${logo}), auto;
}
.menuBurger{
     box-sizing: content-box;
}
  html,body,#root{
    height: 100%;
    padding: 0;
    margin: 0;
    scroll-behavior:smooth;
  }
  a{
    text-decoration: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.redColor{
    color:red;
}
.greenColor{
    color:green;
}
::-webkit-scrollbar {
    width:8px;
    height: 8px;
    background-color: white;
}

::-webkit-scrollbar-thumb {
    background-color: #ff0202;
    background-color: #253861;
    border-radius: 9em;
    box-shadow: inset 1px 1px 10px #f3faf7;
}
::-webkit-scrollbar-thumb:hover {
    background-color:  #ff0202;
}


`