import {createGlobalStyle} from "styled-components";


export const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
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
`