import * as  React from 'react';
import ReactStars from 'react-rating-stars-component';
import {ProductCard} from "./ProductStyles";
import {Box, Typography} from "@mui/material";


const options = {
    edit:false,
    color:'rgba(20,20,20,0.1)',
    activeColor:'tomato',
    value:2.5,
    isHalf:true,
    size:window.innerWidth < 600 ? 16 : 25
}


const Product = ({product}) => {
    const {price,_id,images,name} = product;

    return (
        <ProductCard to={_id}>
            <img src={images[0].url} alt={name}/>
            <Typography component={'p'}>{name}</Typography>
            <Box className={'block'}>
               <ReactStars {...options}/> <Typography className={'productCardSpanViews'} component={'span'}> (256 Просмотров) </Typography>
            </Box>
            <Typography className={'productCardSpanPrice'} component={'span'}>{price}</Typography>
        </ProductCard>
    );
};

export default Product;