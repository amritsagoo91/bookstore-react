import React, { use, useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
function AddBook(props) {
    const [book, setBook] = useState({
        author: '',
        isbn: '',
        price: '',
        title: '',
        year: ''
    })
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSave = () => {
        props.addBook(book)
        setBook({
            author: '',
            isbn: '',
            price: '',
            title: '',
            year: ''
        })
        setOpen(false)
    }

    const inputChanged = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Button variant='outlined' onClick={handleOpen}>
                Add Book
            </Button>
            <Dialog open={open}>
                <DialogTitle>New Book</DialogTitle>
                <DialogContent>
                    <TextField
                        name='author'
                        value={book.author}
                        onChange={inputChanged}
                        margin='dense'
                        label='Author'
                        fullWidth
                    />
                    <TextField
                        name='isbn'
                        value={book.isbn}
                        onChange={inputChanged}
                        margin='dense'
                        label='Isbn'
                        fullWidth
                    />
                    <TextField
                        name='price'
                        value={book.price}
                        onChange={inputChanged}
                        margin='dense'
                        label='Price'
                        fullWidth
                    />
                    <TextField
                        name='title'
                        value={book.title}
                        onChange={inputChanged}
                        margin='dense'
                        label='Title'
                        fullWidth
                    />
                    <TextField
                        name='year'
                        value={book.year}
                        onChange={inputChanged}
                        margin='dense'
                        label='Year'
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleClose}>Cancel</Button>
                    <Button color='primary' onClick={handleSave}>Save</Button>
                    <Button></Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddBook