import {Box, styled} from "@mui/material";



export const FooterWrapper = styled("footer")`
  margin-top: 10vmax;
  padding: 2vmax;
  background-color: rgb(34, 33, 33);
  color: white;
  display: flex;
  align-items: center;
`

export const LeftBlock = styled(Box)`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h4{
      font-family: "Roboto";
      font-size: 1vmax;
  }
  p{
    text-align: center;
    font-size: 1.2vmax;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
  img{
    width: 10vmax;
    margin: 1vmax;
    cursor: pointer;
  }
`



export const MiddleBlock= styled(Box)`
  width: 60%;
  text-align: center;
  h1{
     font-size: 4vmax;
     font-family: "Roboto";
     color: #eb4034;
  }
  p{
    max-width: 60%;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    margin: 1vmax auto;
  }
`

export const RightBlock = styled(Box)`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h4{
      font-family: "Roboto";
      font-size: 1.4vmax;
      text-decoration: underline;
  }
  a{
      text-decoration: none;
      font-size: 1.3vmax;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
      color: white;
      transition: all 0.5s;
      margin: 0.5vmax;
  }
`