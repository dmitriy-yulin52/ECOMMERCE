import * as  React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating} from "@mui/material";

const DialogReview = ({isOpen,onCloseDialog,onChange,value}) => {
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={isOpen}
            onClose={onCloseDialog}
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
                    value={value}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog} color="secondary">
                    Отмена
                </Button>
                <Button onClick={() => {
                }} color="primary">
                    Отправить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogReview;