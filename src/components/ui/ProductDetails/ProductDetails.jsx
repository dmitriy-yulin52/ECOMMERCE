import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../MetaData";
import {Box, Button, Rating, Typography} from "@mui/material";
import Loader from "../../common/Loader/Loader";
import './ProductDetails.scss'
import Carousel from 'better-react-carousel'
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
} from "../../../store/reducers/productDetails/constants";
import {productApi} from "../../../api/product/productApi";
import ReviewCard from "../ReviewCard/ReviewCard";
import DialogReview from "../../common/DialogReview/DialogReview";
import {snackBarActions} from "../../../store/reducers/snackBar/snackBarReducer";
import {productDetailsActions} from "../../../store/reducers/productDetails/actions";


const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
};


const style = {margin: '0px auto 10px auto'}


const ProductDetails = () => {

    const {product, loading, error} = useSelector(state => state.productDetails)
    const {pathname} = useLocation();
    const dispatch = useDispatch()
    const {id} = useParams()


    const [prod, setProd] = useState({})
    const [quantity, setQuantity] = useState(0);
    const [textDialogReview, setTextDialogReview] = useState('')
    const [openDialogReview, setOpenDialogReview] = useState(false)


    const onChangeTextDialogReview = useCallback((e) => {
        setTextDialogReview(e.currentTarget.value)
    }, [])
    const onCloseDialogReviewHandler = useCallback(() => {
        setOpenDialogReview(false)
    }, [setOpenDialogReview])
    const onOpenDialogReviewHandler = useCallback(() => {
        setOpenDialogReview(true)
    }, [setOpenDialogReview])


    const incrQuantity = () => {
        // if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty)
    };

    const decrQuantity = () => {
        // if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    useEffect(() => {
        (async () => {
            try {
                dispatch({
                    type: PRODUCT_DETAILS_REQUEST
                })
                const {data} = await productApi.getProductDetails(id);
                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: data.product
                })
                setProd(data)
            } catch (error) {
                dispatch({
                    type: PRODUCT_DETAILS_FAIL,
                    payload: error.response.data?.message ?? 'Ошибка'
                })
            }
        })()
        window.scrollTo(0, 0);
    }, [dispatch, id,pathname])


    useEffect(() => {
        if (error) {
            dispatch(snackBarActions.openSnackBar(true))
            dispatch(snackBarActions.setMessage(error))
            dispatch(productDetailsActions.clearError())
        }
    }, [dispatch, error])


    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <MetaData title={`${product.name} -- ECOMMERCE`}/>
                    <Box
                        className={'ProductDetails'}
                    >
                        <Box className={'block'}>
                            <Carousel
                                hideArrow={product.images && product?.images.length === 1}
                                cols={1}
                                rows={1}
                                gap={10}
                                loop
                                scrollSnap
                                autoplay={3000}
                                mobileBreakpoint={500}
                            >
                                {prod.product ? prod.product.images.map((el) => {
                                    return <Carousel.Item key={el.url}>
                                        <img width="100%" src={el.url}/>
                                    </Carousel.Item>
                                }) : <Carousel.Item>
                                    <img width="100%" src={'https://picsum.photos/800/600?random=1'}/>
                                </Carousel.Item>}

                            </Carousel>
                        </Box>

                        <Box className={'block mod'}>
                            <Box className="detailsBlock-1">
                                <Typography variant={'h2'} component={'h2'}>{product.name}</Typography>
                                <Typography component={'p'}>Продукт # {product._id}</Typography>
                            </Box>
                            <Box className="detailsBlock-2">
                                <Rating {...options} value={product.ratings}/>
                                <Typography component={'span'} className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Просмотры)
                                </Typography>
                            </Box>
                            <Box className="detailsBlock-3">
                                <Typography variant={'h1'} component={'h1'}>{`${product.price}P`}</Typography>
                                <Box className="detailsBlock-3-1">
                                    <Box className="detailsBlock-3-1-1">
                                        <button onClick={decrQuantity}>-</button>
                                        <Typography component={'span'}>{quantity}</Typography>
                                        <button onClick={incrQuantity}>+</button>
                                    </Box>
                                    <Button
                                        className={'button-last'}
                                        onClick={() => {
                                        }}
                                    >
                                        Добавить в корзину
                                    </Button>
                                </Box>
                                <Typography component={'p'}>
                                    Статус:
                                    <Typography
                                        margin={'0px 0px 0px 8px'}
                                        component={'b'}
                                        className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "Нет в наличии" : "В наличии"}
                                    </Typography>
                                </Typography>
                            </Box>

                            <Box className="detailsBlock-4">
                                Описание : <Typography component={'p'}>{product.description}</Typography>
                            </Box>

                            <Button onClick={onOpenDialogReviewHandler} className="submitReview">
                                Отправить отзыв
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        <h3 style={style} className="reviewsHeading">ОТЗЫВЫ</h3>
                        <DialogReview
                            value={textDialogReview}
                            isOpen={openDialogReview}
                            onChange={onChangeTextDialogReview}
                            onCloseDialog={onCloseDialogReviewHandler}
                        />
                        {product.reviews && product.reviews[0] ? (
                            <Box className="reviews">
                                {product.reviews && product.map((review) => <ReviewCard review={review}/>)}
                            </Box>
                        ) : (
                            <Box className="noReviews">Отзывов Пока Нет</Box>
                        )}
                    </Box>

                </>
            )}
        </>
    );
};

export default ProductDetails;