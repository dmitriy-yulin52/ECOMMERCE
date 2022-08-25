import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {productDetailsActions} from "../../../store/reducers/productDetails/actions";
import MetaData from "../MetaData";
import Carousel from "react-material-ui-carousel";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Rating,
    Typography
} from "@mui/material";
import Loader from "../../common/Loader/Loader";
import './ProductDetails.scss'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';


const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
};

const ProductDetails = () => {

    const {product, loading} = useSelector(state => state.productDetails)

    console.log(product, 'product')

    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(productDetailsActions.getProductDetails(id))
    }, [dispatch, id])

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
                            <Carousel className={'Carousel'}>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
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
                                        <IconButton>
                                            <RemoveSharpIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <AddSharpIcon/>
                                        </IconButton>
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
                                    <Typography component={'b'} className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </Typography>
                                </Typography>
                            </Box>

                            <Box className="detailsBlock-4">
                                Описание : <Typography component={'p'}>{product.description}</Typography>
                            </Box>

                            <Button onClick={() => {
                            }} className="submitReview">
                                Отправить отзыв
                            </Button>
                        </Box>
                    </Box>
                    <Typography component={'h3'} style={{margin:'0px auto 10px auto'}} className="reviewsHeading">ОТЗЫВЫ</Typography>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={false}
                        onClose={() => {
                        }}
                    >
                        <DialogTitle>Отправить отзыв</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={() => {
                                }}
                                value={0}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={'comment'}
                                onChange={() => {
                                }}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                            }} color="secondary">
                                Отмена
                            </Button>
                            <Button onClick={() => {
                            }} color="primary">
                                Отправить
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <Box className="reviews">
                            Отзывы
                        </Box>
                    ) : (
                        <Typography component={'p'} className="noReviews">Отзывов Пока Нет</Typography>
                    )}
                </>
            )}
        </>
    );
};

export default ProductDetails;