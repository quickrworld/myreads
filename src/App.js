import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelves from './Bookshelves'
import BookDetails from './BookDetails'
import Log from './Log'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    shelfBooksStore: {},
    searchedBooksStore: {},
    query: '',
    book: null,
    message: ''
  }

  componentDidMount() {
    console.log("App component did mount")
    BooksAPI.getAll().then((shelfBooks) => {
      let shelfBooksStore = {}
      shelfBooks.forEach((shelfBook) => {
        shelfBooksStore[shelfBook.id] = shelfBook
      })
      this.setState({shelfBooksStore, shelfBooks})
    }).catch((error) => {
      this.logMessage(`(${error.message}): Failed to get books for the shelves from the server.`)
    })
  }

  logMessage = (message) => {
    this.setState({message: message})
  }

  resetMessage = () => {
    this.setState({message: ''})
  }

  changeBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      if (shelf === "none") {
        let shelfBooksStore = Object.assign({}, this.state.shelfBooksStore)
        delete shelfBooksStore[book.id]
        this.setState({shelfBooksStore})
      } else if (result[shelf].includes(book.id)) {
        let shelfBooksStore = Object.assign({}, this.state.shelfBooksStore)
        shelfBooksStore[book.id].shelf = shelf
        this.setState({shelfBooksStore})
      } else {
        this.logMessage("Server update failed")
      }
    }).catch((error) => {
      this.logMessage(
        `(${error.message}): Action move book '${book.title}' from '${book.shelf}' to '${shelf}' may have failed.`)
    })
  }

  placeSearchedBookOnShelf = (book, shelf) => {
    const bookOnShelf = this.state.shelfBooksStore[book.id]
    if (bookOnShelf) {
      this.changeBookshelf(book, shelf)
    } else {
      if (["currentlyReading", "wantToRead", "read"].includes(shelf)) {
        BooksAPI.update(book, shelf).then((result) => {
          if (result && result[shelf] && result[shelf].includes(book.id)) {
            book.shelf = shelf
            let newShelfBooks = this.state.shelfBooksStore
            newShelfBooks[book.id] = book
            this.setState({shelfBooksStore: newShelfBooks})
          } else {
            this.logMessage("Server update failed")
          }
        }).catch((error) => {
          this.logMessage(
            `(${error.message}): Action move book '${book.title}' from '${book.shelf}' to '${shelf}' may have failed.`)
        })
      }
    }
  }

  shelfBooks = (shelfBooksStore) => {
    return Object.keys(shelfBooksStore)
      .map(id => shelfBooksStore[id])
  }

  searchedBooks = (searchedBooksStore) => {
    return Object.keys(searchedBooksStore)
      .map(id => searchedBooksStore[id])
  }

  selectBook = (book) => {
    this.setState({book: book})
  }

  searching = false
  nextQuery = false

  updateQuery = (query) => {

    this.setState({query})

    if (this.searching) {
      this.nextQuery = true
      return
    }

    this.searching = true
    this.nextQuery = false

    if (query.trim().length === 0) {
      this.setState({searchedBooksStore: {}, query: query})
      this.searching = false
      return
    }

    BooksAPI.search(query.trim(), 20).then((searchedBooks) => {
      this.searching = false
      if (searchedBooks) {
        if (searchedBooks.error) {
          this.setState({searchedBooksStore: {}})
        } else {
          searchedBooks.forEach((searchedBook) => {
            const bookOnShelf = this.state.shelfBooksStore[searchedBook.id]
            if (bookOnShelf) {
              searchedBook.shelf = bookOnShelf.shelf
            } else {
              searchedBook.shelf = "none" // Check
            }
          })
          let searchedBooksStore = {}
          searchedBooks.forEach((searchedBook) => {
            searchedBooksStore[searchedBook.id] = searchedBook
            this.setState({searchedBooksStore})
          })
        }
        if (this.nextQuery) {
          this.updateQuery(this.state.query)
        }
      }
    }).catch((error) => {
      this.searching = false
      this.logMessage(`(${error.message}): Failed to get results for search term '${query}'.`)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={(props) => (
          <Bookshelves
            shelfBooks={this.shelfBooks(this.state.shelfBooksStore)}
            searchedBooks={this.searchedBooks(this.state.searchedBooksStore)}
            changeBookshelf={this.changeBookshelf}
            selectBook={this.selectBook}
            history={props.history}
          />
        )}/>
        <Route exact path="/search" render={(props) => (
          <SearchBooks
            searchedBooks={this.searchedBooks(this.state.searchedBooksStore)}
            query={this.state.query}
            updateQuery={this.updateQuery}
            changeBookshelf={this.placeSearchedBookOnShelf}
            selectBook={this.selectBook}
            history={props.history}
          />
        )}/>
        <Route exact path="/bookdetails" render={(props) => (
          <BookDetails
            book={this.state.book}
            changeBookshelf={this.changeBookshelf}
            history={props.history}
          />
        )}/>
        <Route path="" render={(props) => (
          <Log
            message={this.state.message}
            resetMessage={this.resetMessage}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
