import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'
import './App.css'

class Bookshelves extends React.Component {
  
  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    searchedBooks: PropTypes.array.isRequired,
    changeBookshelf: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              books={this.props.shelfBooks.filter((book) => book.shelf === "currentlyReading")}
              changeBookshelf={this.props.changeBookshelf}
            />
            <Bookshelf
              title='Want to Read'
              books={this.props.shelfBooks.filter((book) => book.shelf === "wantToRead")}
              changeBookshelf={this.props.changeBookshelf}
            />
            <Bookshelf
              title='Read'
              books={this.props.shelfBooks.filter((book) => book.shelf === "read")}
              changeBookshelf={this.props.changeBookshelf}
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
}

export default Bookshelves
