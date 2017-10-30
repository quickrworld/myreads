import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelves from './Bookshelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    shelfBooks: [],
    searchedBooks: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((shelfBooks) => {
      this.setState({ shelfBooks })
    })
  }

  changeBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      if (result[shelf].includes(book.id)) {
        this.setState((state) => ({
          shelfBooks: this.state.shelfBooks.map((shelfBook) => {
            if (shelfBook.id === book.id) { shelfBook.shelf = shelf }
            return shelfBook
          })
        }))
      }
    })
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
      this.setState({searchedBooks: [], query: ''})
      this.searching = false
      return
    }

    BooksAPI.search(query.trim(), 100).then((searchedBooks) => {
      this.searching = false
      if (searchedBooks) {
        if (searchedBooks.error) {
          this.setState({searchedBooks: []})
        } else {
          searchedBooks.forEach((searchedBook) => {
            const found = this.state.shelfBooks.find((shelfBook, index, array) => shelfBook.id === searchedBook.id)
            if (found) {
              searchedBook.shelf = found.shelf
            } else {
              searchedBook.shelf = "none"
            }
          })
          this.setState({searchedBooks})
        }
        if (this.nextQuery) {
          this.updateQuery(this.state.query)
        }
      }
    }).catch((error) => {
      this.searching = false
    })
  }

  placeSearchedBookOnShelf = (book, shelf) => {
    const bookOnShelf = this.state.shelfBooks.find((element,index,array) => { return element.id === book.id })
    if (bookOnShelf) {
      this.changeBookshelf(book, shelf)
    } else {
      BooksAPI.update(book, shelf).then((result) => {
        book.shelf = shelf
        const newShelfBooks = this.copyArray(this.state.shelfBooks)
        newShelfBooks.push(book)
        this.setState( { shelfBooks: newShelfBooks } )
      })
    }
  }

  copyArray(a) {
    var i = a.length
    const b = []
    while (i--) { b[i] = a[i] }
    return b
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelves
            shelfBooks={this.state.shelfBooks}
            searchedBooks={this.state.searchedBooks}
            changeBookshelf={this.changeBookshelf}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks
            shelfBooks={this.state.shelfBooks}
            searchedBooks={this.state.searchedBooks}
            query={this.state.query}
            updateQuery={this.updateQuery}
            changeBookshelf={this.placeSearchedBookOnShelf}
          />
        )}/>        
      </div>
    )
  }
}

export default BooksApp
