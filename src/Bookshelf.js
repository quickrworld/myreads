import React from 'react'
import './App.css'
import Book from './Book'
import PropTypes from 'prop-types'


Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
  selectBook: PropTypes.func.isRequired,
  currentLocation: PropTypes.object,
  history: PropTypes.object.isRequired
}

function Bookshelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <li key={`${book.title} + ":" + ${book.authors}`}>
              <Book
                book={book}
                changeBookshelf={props.changeBookshelf}
                selectBook={props.selectBook}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf
