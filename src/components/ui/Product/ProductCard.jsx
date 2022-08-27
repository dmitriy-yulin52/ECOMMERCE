import * as  React from 'react';
import ReactStars from 'react-rating-stars-component';
import {ProductCard} from "./ProductStyles";
import {Box, Typography} from "@mui/material";
import {memo} from "react";


const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 800 ? 16 : 25
}

const ProductCardImpl = memo(({product}) => {
    const {price, _id, images, name, ratings, numOfReviews} = product;

    return (
        <ProductCard
            to={`/product/${_id}`}
        >
            <img src={images[0].url} alt={name}/>
            <Typography component={'p'}>{name}</Typography>
            <Box className={'block'}>
                <ReactStars {...options} value={ratings}/>
                <Typography className={'productCardSpanViews'} component={'span'}>
                    {`${numOfReviews} Просмотры`}
                </Typography>
            </Box>
            <Typography className={'productCardSpanPrice'} component={'span'}>{`${price} ₽`}</Typography>
        </ProductCard>
    );
});

export default ProductCardImpl;