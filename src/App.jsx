import { useEffect, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';

import './App.css'
import { AppBar, Toolbar, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import AddBook from './AddBook';

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()

  }, [])

  const fetchBooks = () => {
    fetch('https://bookstore-bf65c-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Response is not Ok!')
        }
        return response.json()
      })
      .then(data =>
        // setBooks(Object.values(data)))
        addKeys(data))
      .catch(err => console.log(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data)
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] })
    )
    setBooks(valueKeys)
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-bf65c-default-rtdb.europe-west1.firebasedatabase.app/books/.json'
      , {
        method: 'POST',
        body: JSON.stringify(newBook)
      })
      .then(response => fetchBooks())
      .catch(err => console.log(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-bf65c-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      { method: 'DELETE' }
    )
      .then(response => fetchBooks())
      .catch(err => console.log(err))
  }


  const columnDefs = [
    { field: 'author', sortable: 'true' },
    { field: 'isbn', sortable: 'true', },
    { field: 'price', sortable: 'true' },
    { field: 'title', sortable: 'true' },
    { field: 'year', sortable: 'true' },
    {
      headerName: 'Action',
      field: 'id',
      width: 90,
      cellRenderer: (params) =>
        <IconButton
          onClick={() => deleteBook(params.value)}
          size='small'
          color='error'
        >

          <DeleteIcon />
        </IconButton>

    }
  ]

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>
            Bookstore
          </Typography>
        </Toolbar>

      </AppBar>
      <AddBook addBook={addBook} />
      <div className="ag-theme-material" style={{ height: 600, width: 1100 }}>
        <AgGridReact rowData={books} columnDefs={columnDefs} />
      </div>
    </>
  )
}

export default App
