import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBookshelves from './ListBookshelves'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBookshelves
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks
          />
        )}/>        
      </div>
    )
  }
}

export default BooksApp
