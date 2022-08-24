import * as React from 'react';
import {CgMouse} from "react-icons/cg";
import img from '../../../assets/images/cover.jfif'
import {Box, Button, Link, Typography} from "@mui/material";
import {BannerBlock, WrapperHome} from "./HomeStyles";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Product from '../Product/Product'

const style = {
    backgroundImage: `url(${img})`
}


const product = {
    name:'dima',
    images:[{url:'https://fotointeres.ru/wp-content/uploads/2014/03/Color-dreams.jpg'}],
    price:'300р',
    _id:'qw'
}


const Home = () => {
    return (
        <WrapperHome>
            <Header/>
            <BannerBlock style={style}>
                <Typography component={'p'}>Добро пожаловать в Ecommerce</Typography>
                <Typography variant={'h1'} component={'h1'}>НАЙДИТЕ УДИВИТЕЛЬНЫЕ ПРОДУКТЫ НИЖЕ</Typography>
                <Link href="#container">
                    <Button variant={'contained'}>
                        Scroll <CgMouse/>
                    </Button>
                </Link>
            </BannerBlock>
            <Typography variant={'h2'} component={'h2'}>Рекомендуемые продукты</Typography>
            <Box className="container" id="container">
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
            </Box>
             <Footer/>
        </WrapperHome>
    );
};

export default Home;