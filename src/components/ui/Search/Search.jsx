import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, List, ListItem, Paper} from "@mui/material";
import './Search.scss'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../../store/reducers/product/actions";
import useDebounce from "../../../utils/hooks/useDebounce";
import Loader from "../../common/Loader/Loader";


const Search = () => {

    const {products, loading} = useSelector(state => state.products)

    const [keyword, setKeyword] = useState("");
    const [viewProducts, setViewProducts] = useState(false);

    const debounce = useDebounce(keyword)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onChangeKeywordHandler = (e) => {
        setKeyword(e.currentTarget.value)
        if (e.currentTarget.value) {
            setViewProducts(true)
        } else {
            setViewProducts(false)
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`, {replace: true});
        } else {
            navigate("/products", {replace: true});
        }
    };

    useEffect(() => {
        dispatch(productActions.getAllProduct(keyword))
    }, [debounce])


    return (
        <>
            <Box component={'form'} className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    value={keyword}
                    placeholder="Найти продукт ..."
                    onChange={onChangeKeywordHandler}
                />

                {viewProducts && <Paper className={'paper'} elevation={1}>
                    <List>
                        {
                            products.length > 0
                                ?
                                <Box className={'block'}>{products.map((product) => (
                                    <Link to={`/products/${product.name}`}>
                                        <ListItem>{product.name}</ListItem>
                                    </Link>))}
                                </Box>
                                : loading ? <Loader styleHeight={true}/> :
                                    <Box
                                        width={'100vw'}
                                        height={''}
                                        bgcolor={'white'}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        maxWidth={'100%'}
                                    >Ничего не найдено!</Box>}
                    </List>
                </Paper>}
                <input type="submit" value="Search"/>
            </Box>
        </>
    );
};


export default Search;