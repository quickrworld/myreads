import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import './App.css'

class SearchBooks extends React.Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    updateQuery: PropTypes.func.isRequired,
    changeBookshelf: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired
  }

  retrieveQuery() {
    return sessionStorage.getItem("query")
  }

  componentWillMount() {
    const query = this.retrieveQuery()
    if (query) {
      this.props.updateQuery(query)
    }
  }

  render() {
    const props = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={props.query}
              onChange={(event) => props.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {props.searchedBooks &&
            (props.searchedBooks.length > 0) &&
            props.searchedBooks.map((book) => (
              <li key={book.id}>
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
}

export default SearchBooks
