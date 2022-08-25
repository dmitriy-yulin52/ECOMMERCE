import * as  React from 'react';
import ReactStars from 'react-rating-stars-component';
import {ProductCard} from "./ProductStyles";
import {Box, Typography} from "@mui/material";



const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 800 ? 16 : 25
}

const ProductCardImpl = ({product}) => {
    const {price, _id, images, name} = product;

  //     const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });


    return (
        <ProductCard to={`/product/${_id}`}
                     >
            <img src={product.images[0].url} alt={name}/>
            <Typography component={'p'}>{name}</Typography>
            <Box className={'block'}>
                <ReactStars {...options} value={product.ratings}/>
                <Typography className={'productCardSpanViews'} component={'span'}>
                    {`${product.numOfReviews} Просмотры`}
                </Typography>
            </Box>
            <Typography className={'productCardSpanPrice'} component={'span'}>{`${price} ₽`}</Typography>
        </ProductCard>
    );
};

export default ProductCardImpl;