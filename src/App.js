import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
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
