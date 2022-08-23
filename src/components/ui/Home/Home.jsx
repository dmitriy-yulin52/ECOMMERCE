import * as React from 'react';
import {CgMouse} from "react-icons/cg";
import img from '../../../assets/images/cover.jfif'
import {Box, Button, Link, Typography} from "@mui/material";
import {BannerBlock, WrapperHome} from "./HomeStyles";

const style = {
    backgroundImage: `url(${img})`
}

const Home = () => {
    return (
        <WrapperHome>
            <BannerBlock className="banner" style={style}>
                <Typography component={'p'}>Welcome to Ecommerce</Typography>
                <Typography variant={'h1'} component={'h1'}>FIND AMAZING PRODUCTS BELOW</Typography>
                <Link href="#container">
                    <Button variant={'outlined'}>
                        Scroll <CgMouse/>
                    </Button>
                </Link>
            </BannerBlock>
            <Typography variant={'h2'} component={'h2'}>Featured Products</Typography>
            <Box className="container" id="container">
                products
            </Box>
        </WrapperHome>
    );
};

export default Home;