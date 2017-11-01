import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'
import './App.css'

Bookshelves.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  searchedBooks: PropTypes.array.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
  selectBook: PropTypes.func.isRequired
}

function Bookshelves(props) {
  const booksForNamedShelf = (books, shelf) => {
    return books.filter(book => book.shelf === shelf)
  }
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            title='Currently Reading'
            books={booksForNamedShelf(props.shelfBooks, "currentlyReading")}
            changeBookshelf={props.changeBookshelf}
            selectBook={props.selectBook}
          />
          <Bookshelf
            title='Want to Read'
            books={booksForNamedShelf(props.shelfBooks, "wantToRead")}
            changeBookshelf={props.changeBookshelf}
            selectBook={props.selectBook}
          />
          <Bookshelf
            title='Read'
            books={booksForNamedShelf(props.shelfBooks, "read")}
            changeBookshelf={props.changeBookshelf}
            selectBook={props.selectBook}
          />
        </div>
      </div>
      <div className="open-search">
        <Link
          to='/search'
        >Add a book</Link>
      </div>
    </div>
  )
}

export default Bookshelves
