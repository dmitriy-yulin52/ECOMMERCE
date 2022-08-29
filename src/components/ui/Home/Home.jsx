import * as React from 'react';
import {useCallback, useEffect} from 'react';
import {CgMouse} from "react-icons/cg";
import img from '../../../assets/images/cover.jfif'
import {Button, Link, Typography} from "@mui/material";
import {BannerBlock, WrapperHome} from "./HomeStyles";
import ProductCard from '../Product/ProductCard'
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../../store/reducers/product/actions";
import Loader from "../../common/Loader/Loader";
import {SnackBar} from "../../common/SnackBar/SnackBar";
import {snackBarActions} from "../../../store/reducers/snackBar/snackBarReducer";

const style = {
    backgroundImage: `url(${img})`
}


const Home = () => {
    const dispatch = useDispatch()

    const {products, loading, error} = useSelector(state => state.products)
    const {open, message} = useSelector(state => state.snackBar)


    const onCloseSnackBar = useCallback(() => {
        dispatch(snackBarActions.closeSnackBar())
    }, [dispatch])


    useEffect(() => {
        dispatch(productActions.getAllProduct())
        window.scrollTo(0, 0);
    }, [dispatch])

    useEffect(() => {
        if (error) {
            dispatch(snackBarActions.openSnackBar(true))
            dispatch(snackBarActions.setMessage(error))
            dispatch(productActions.clearErrors())
        }
    }, [error])

    return (
        <>
            {loading
                ? <Loader/>
                : <WrapperHome>
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
                    <div
                        className="container"
                        id="container"
                    >
                        {products.map((product) => <ProductCard key={product._id}
                                                                product={product}/>)}
                    </div>
                    <SnackBar open={open} onClose={onCloseSnackBar} severity={'error'} messageError={message}/>
                </WrapperHome>
            }
        </>
    );
};

export default Home;