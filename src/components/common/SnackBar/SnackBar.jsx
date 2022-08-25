import * as React from 'react'
import {Alert, Snackbar} from "@mui/material";


const sx = {
    width: '100%'
}

const anchorOrigin = {
    vertical:'bottom', horizontal:'center'
}

export const SnackBar = (props)=> {
    const {open,messageError,severity,onClose}= props

    return (
        <Snackbar anchorOrigin={anchorOrigin} open={open} autoHideDuration={4000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={sx}>
                {messageError ? messageError : 'Error'}
            </Alert>
        </Snackbar>
    );
};