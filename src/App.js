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
    /*
    Using the react-router to render the main page Shelves or the Search page
    Passing the books already in shelves for both components, and also the updateShelf
    */
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves 
            books={this.state.books} 
            updateShelf={this.updateShelf}
          />
        )} />
        <Route path="/search" render={() => (
          <Search 
            books={this.state.books} 
            updateShelf={this.updateShelf}
          />
          )} />
      </div>
    )
  }

  //Using the API to fetch books from the Server
  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state.books)
    })
  }

  /*
  Passing the method via props to Shelves -> Shelf and also to Search Components
  This method send via the API the new shelf selected by the user to the server and after that fetch the books from server again
  */
  updateShelf = (shelf, bookId) => {
    BooksAPI.update({id: bookId}, shelf).then( () => {
      this.fetchBooks()
    })
    
    
  }
}

export default BooksApp
