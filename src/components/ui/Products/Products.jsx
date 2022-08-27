import * as  React from 'react';
import {useEffect, useState} from 'react';
import './Products.scss'
import {Box, Slider, Typography} from "@mui/material";
import Loader from "../../common/Loader/Loader";
import ProductCard from "../Product/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../../store/reducers/product/actions";
import {snackBarActions} from "../../../store/reducers/snackBar/snackBarReducer";
import {useParams} from "react-router-dom";
import Pagination from 'react-js-pagination'
import useDebounce from "../../../utils/hooks/useDebounce";

const categories = [
    "Ноутбук",
    "Обувь",
    "Низ",
    "Топы",
    "Одежда",
    "Камера",
    "Смартфоны",
];


const Products = () => {
    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);
    const dispatch = useDispatch()
    const params = useParams()

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState(null);
    const [ratings, setRatings] = useState(null);

    const keyword = params.keyword
    const debouncePrice = useDebounce(price,1000)
    const debounceRatings = useDebounce(ratings,1000)

    const onSetPriceHandler = (_, newPrice) => {
        setPrice(newPrice);
    };
    const setCurrentPageHandler = (e) => {
        setCurrentPage(e);
    };
    const onSetRatingHandler = (_, newRating) => {
        setRatings(newRating);
    }

    useEffect(() => {
        dispatch(productActions.getAllProduct(keyword, currentPage,debouncePrice,debounceRatings,category))
    }, [currentPage, keyword, dispatch,debouncePrice,debounceRatings,category])

    useEffect(() => {
        if (error) {
            dispatch(snackBarActions.openSnackBar(true))
            dispatch(snackBarActions.setMessage(error))
            dispatch(productActions.clearErrors())
        }
    }, [error])


    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <h2 className="productsHeading">Продукты</h2>
                    <div className="products">
                        {products && products.length === 0 ?
                            <Box color={'rgba(0, 0, 0, 0.548)'}>Ничего не найдено!</Box> :
                            products.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Цены</Typography>
                        <Slider
                            value={price}
                            onChange={onSetPriceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />

                        <Typography>Категории</Typography>
                        <ul className="categoryBox">
                            {categories.map((el) => {
                               return  <li
                                    className={`category-link ${category === el ? 'active' : ''}`}
                                    key={el}
                                    onClick={() => setCategory(el)}
                                >
                                    {el}
                                </li>
                            })}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Рейтинги</Typography>
                            <Slider
                                value={ratings}
                                onChange={onSetRatingHandler}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < productsCount && <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageHandler}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>}
                </>
            )}
        </>
    );
};

export default Products;