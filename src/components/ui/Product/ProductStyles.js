import {styled} from "@mui/material";
import {Link} from "react-router-dom";
import styledComponent from 'styled-components'




export const MediaProductCard = styledComponent(Link)`

@media screen and (max-width: 600px) {
     p{
        font-size: 1.7vmax;
     }
    .block{
        margin: 0vmax;
        display: block;
    }
    .productCardSpanPrice{
        font-size: 1.5vmax;
    }
    .productCardSpanPrice{
        margin: 0 0.5vmax;
        font: 300 1vmax "Roboto";
    }
}
`

export const ProductCard = styled(MediaProductCard)`
  width: 14vmax;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgb(48, 48, 48);
  margin: 2vmax;
  transition: all 0.5s;
  padding-bottom: 0.5vmax;
  :hover{
      box-shadow: 0 0 5px rgba(15, 15, 15, 0.26);
      transform: translateY(-1vmax);
  }
  
  img{
    width: 14vmax;
  }
  .block{
      margin: 0.5vmax;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  p{
      font-family: "Roboto";
      font-size: 1.2vmax;
      margin: 1vmax 0.5vmax;
      margin-bottom: 0;
  }
  .productCardSpanPrice{
      margin: 0.5vmax;
      color: tomato;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-size: 1vmax;
  }
  
  .productCardSpanViews{
      margin: 0.5vmax;
      font: 300 0.7vmax "Roboto";
  }
  
  @media screen and (max-width: 600px) {
     p{
        font-size: 1.7vmax;
     }
    .block{
        margin: 0vmax;
        display: block;
    }
    .productCardSpanPrice{
        font-size: 1.5vmax;
    }
    .productCardSpanPrice{
        margin: 0 0.5vmax;
        font: 300 1vmax "Roboto";
    }
}

`
