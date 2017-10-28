import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class ListBookshelves extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.setState((state) => ({
      books: this.state.books.map((b) => {
        if (b.id === book.id) { b.shelf = shelf }
        return b
      })
    }))
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
              books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
              changeBookshelf={this.changeBookshelf}
            />
            <Bookshelf
              title='Want to Read'
              books={this.state.books.filter((book) => book.shelf === "wantToRead")}
              changeBookshelf={this.changeBookshelf}
            />
            <Bookshelf
              title="Read"
              books={this.state.books.filter((book) => book.shelf === "read")}
              changeBookshelf={this.changeBookshelf}
            />
            <Bookshelf
              title="Uncategorized"
              books={this.state.books.filter((book) => ((book.shelf !== "currentlyReading") &&
                                                       (book.shelf !== "wantToRead") &&
                                                       (book.shelf !== "read"))
              )}
              changeBookshelf={this.changeBookshelf}
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

export default ListBookshelves
