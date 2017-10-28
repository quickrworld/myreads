import React from 'react'
import './App.css'
import Book from './Book'

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={`${book.title} + ":" + ${book.authors}`}>
                <Book
                  book={book}
                  changeBookshelf={this.props.changeBookshelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf