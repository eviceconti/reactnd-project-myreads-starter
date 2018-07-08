import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Shelves from './Shelves'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: this.fetchBooks()
    }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (     <Shelves books={this.state.books} />
        )} />
        <Route path="/search" component={Search} />
      </div>
    )
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state.books)
    })
  }
}

export default BooksApp
