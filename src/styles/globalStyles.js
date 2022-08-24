import {createGlobalStyle} from "styled-components";


export const GlobalStyle = createGlobalStyle`
  html,body,#root{
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scroll-behavior:smooth;
  }
  a{
    text-decoration: none;
  }
`