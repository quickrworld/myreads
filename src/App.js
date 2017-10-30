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
      if (shelf === "none") {
        let i = this.state.shelfBooks.length
        const newShelfBooks = []
        while (i--) {
          if (this.state.shelfBooks[i].id !== book.id) {
            newShelfBooks.push(this.state.shelfBooks[i])
          }
        }
        this.setState({shelfBooks: newShelfBooks})
      } else if (result[shelf].includes(book.id)) {
        this.setState((state) => ({
          shelfBooks: this.state.shelfBooks.map((shelfBook) => {
            if (shelfBook.id === book.id) { shelfBook.shelf = shelf }
            return shelfBook
          })
        }))
      } else {
        // server update failed: provide feedback to user
      }
    })
  }

  placeSearchedBookOnShelf = (book, shelf) => {
    const bookOnShelf = this.state.shelfBooks.find((element,index,array) => element.id === book.id)
    if (bookOnShelf) {
      this.changeBookshelf(book, shelf)
    } else {
      BooksAPI.update(book, shelf).then((result) => {
        if (result[shelf].includes(book.id)) {
          book.shelf = shelf
          const newShelfBooks = this.copyArray(this.state.shelfBooks)
          newShelfBooks.push(book)
          this.setState( { shelfBooks: newShelfBooks } )          
        } else {
          // server update failed: provide feedback to user
        }
      })
    }
  }

  copyArray(a) {
    var i = a.length
    const b = []
    while (i--) { b[i] = a[i] }
    return b
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
