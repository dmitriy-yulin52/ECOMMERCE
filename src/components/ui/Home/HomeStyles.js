import {Box, styled} from "@mui/material";



export const WrapperHome = styled(Box)`
    h2{
      text-align: center;
      font-family: Roboto;
      font-size: 1.4vmax;
      border-bottom: 1px solid rgba(21, 21, 21, 0.5);
      width: 20vmax;
      padding: 1vmax;
      margin: 5vmax auto;
      color: rgb(0, 0, 0, 0.7);
    }
    
    .container{
      display: flex;
      margin: 2vmax auto;
      width: 80vw;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 100%;
    }
`

const Banner = styled(Box)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  height: 100vmin;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  
  h1{
      margin: 5vmax;
      font: 600 2.5vmax "Roboto";
  }
  p{
    font: 300 1.4vmax "Lucida Sans";
  }
  a{
    text-decoration:none;
  }
  button{
      margin-bottom: 5vmax;
      cursor: pointer;
      background-color: white;
      color:#1976d2;
      border: none;
      border-radius: 10px;
      padding: 1vmax;
      transition: all 0.5s;
      width: 9vmax;
      font: 500 1vmax "Roboto";
      :hover{
        color:white;
      }
  }
`

export const BannerBlock = styled(Banner)`
::after{
  content: "";
  width: 100vw;
  height: 100vmin;
  background-color: #ffffff;
  position: absolute;
  top: 0%;
  left: 0;
  clip-path: polygon(100% 68%, 0 100%, 100% 100%);
  max-width: 100%;
}
`