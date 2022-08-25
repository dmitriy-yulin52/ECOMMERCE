import {Box,styled} from "@mui/material";


export const ProductDetails = styled(Box)`
  background-color: rgb(255, 255, 255);
  width: 100vw;
  max-width: 100%;
  padding: 6vmax;
  box-sizing: border-box;
  display: flex;

  .block-carousel{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 2vmax;
      box-sizing: border-box;
      border: 1px solid white;
  }  
  .Carousel{
      width: 20vmax;
      img{
        width: 20vmax;
      }
  }
  .div:list-child{
      align-items: flex-start;
  }
  
  .detailsBlock-1{
      h2{
         color: rgb(54, 54, 54);
         font: 600 1.6vmax "Roboto"; 
      }
      p{
          color: rgba(54, 54, 54, 0.582);
          font: 200 0.6vmax cursive;
      }
  }
  .detailsBlock-2{
       display: flex;
      justify-content: flex-start;
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, 0.205);
      border-bottom: 1px solid rgba(0, 0, 0, 0.205);
      width: 70%;
      padding: 1vmax 0;
      
      span{
          font: 200 0.8vmax cursive;
          color: rgba(0, 0, 0, 0.699);
      }
  }
  .detailsBlock-3{
    width: 70%;
    h1{
      color: rgba(17, 17, 17, 0.795);
      font: 400 1.8vmax "Franklin Gothic Medium";
      margin: 1vmax 0;
    }
    p{
      border-top: 1px solid rgba(0, 0, 0, 0.205);
      border-bottom: 1px solid rgba(0, 0, 0, 0.205);
      padding: 1vmax 0;
      color: rgba(0, 0, 0, 0.651);
      font: 400 1vmax "Roboto";
      margin: 1vmax 0;
    }
    
    &-1{
       display: flex;
       align-items: center;
       
       button:list-child{
          border: none;
          cursor: pointer;
          color: white;
          transition: all 0.5s;
          background-color: tomato;
          font: 500 0.7vmax "Roboto";
          border-radius: 20px;
          padding: 0.5vmax 2vmax;
          margin: 1vmax;
          outline: none;
          :hover{
              background-color: rgb(214, 84, 61);
          }
       }
       
       &-1{
           button{
              border: none;
              background-color: rgba(0, 0, 0, 0.616);
              padding: 0.5vmax;
              cursor: pointer;
              color: white;
              transition: all 0.5s;
              :hover{
                  background-color: rgba(0, 0, 0, 0.767);
              }
           }
           input{
              border: none;
              padding: 0.5vmax;
              width: 1vmax;
              text-align: center;
              outline: none;
              font: 400 0.8vmax "Roboto";
              color: rgba(0, 0, 0, 0.74); 
           }
       }
       
    }
  }
  
 .detailsBlock-4{
      color: rgba(0, 0, 0, 0.897);
      font: 500 1.2vmax sans-serif;
      p{
          color: rgba(0, 0, 0, 0.534);
          font: 300 0.8vmax sans-serif;
      }
 }
 
 .submitReview{
      border: none;
      background-color: tomato;
      font: 500 0.7vmax "Roboto";
      border-radius: 20px;
      padding: 0.6vmax 2vmax;
      margin: 1vmax 0;
      color: white;
      cursor: pointer;
      transition: all 0.5s;
      outline: none;
      :hover{
          background-color: rgb(197, 68, 45);
          transform: scale(1.1);
      }
 }
 .
  
   
`