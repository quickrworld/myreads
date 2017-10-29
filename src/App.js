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
    BooksAPI.update(book, shelf)
    this.setState((state) => ({
      shelfBooks: this.state.shelfBooks.map((shelfBook) => {
        if (shelfBook.id === book.id) { shelfBook.shelf = shelf }
        return shelfBook
      })
    }))
  }

  updateQuery = (query) => {
    console.log("updateQuery")
    this.setState( {query: query.trim()} )
    if (query) {
      BooksAPI.search(query, 100).then((searchedBooks) => {
        if (searchedBooks.error) {
          console.log(searchedBooks)
          this.setState({searchedBooks: []})
          return
        } else if (searchedBooks) {
          searchedBooks.forEach((searchedBook) => {
            let found = this.state.shelfBooks.find((shelfBook, index, array) => { return shelfBook.id === searchedBook.id })
            if (found) {
              searchedBook.shelf = found.shelf
            } else {
              searchedBook.shelf = "none"
              console.log("shelf set to none")
            }
          })
          this.setState({searchedBooks})  
        }   
      })
    } else {
      this.setState({searchedBooks: []})
    }
  }

  placeSearchedBookOnShelf = (book, shelf) => {
    console.log("placeSearchedBookOnShelf")
    let bookOnShelf = this.state.shelfBooks.find((element,index,array) => { return element.id === book.id })

    if (bookOnShelf) {
      this.changeBookshelf(book,shelf)
    } else {
      BooksAPI.update(book, shelf)
      book.shelf = shelf
      let newShelfBooks = this.state.shelfBooks.map(e => e)
      newShelfBooks.push(book)
      this.setState( { shelfBooks: newShelfBooks } )
    }
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
