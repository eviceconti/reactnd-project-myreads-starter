import React, { Component } from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import Shelf from "./Shelf"

class Search extends Component {
  /* 
  query: set the state of the input (Controlled Field)
  searchedBooks: the return from the .search() from API
  */
  state = {
    query: "",
    searchedBooks: []
  };

  /*
  Invoked on each change of the input Search
  Update the state and if the query is not an empty string calls the searchAPI
  If the query is empty, update the searchedBooks with an empty array
  */
  handleInputChange(query) {
    this.setState({ query })
    if (query.trim() !== "") {
      this.searchAPI(query.trim())
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  /*
  searchAPI
  set the searchedBooks to an empty array if the response from API is an empty array (incorrect search term)
  If get an array with books:
    - set the correct shelf for each book (based on books already in the shelves of main page)
    - update the state with the books received
  */
  searchAPI(query) {
    BooksAPI.search(query).then(searchedBooks => {
      console.log(searchedBooks)
      if (!searchedBooks.error) {
        searchedBooks.forEach(book => book.shelf = 'none')
        searchedBooks.forEach(book => (
          this.props.books
            .filter(b => b.id === book.id)
            .map(b => book.shelf = b.shelf)
        ))
        this.setState({ searchedBooks })
      } else {
        this.setState({ searchedBooks: [] })
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/*Return to main page using react-router*/}
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.handleInputChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks && ( //when the books are available, render them using the Shelf component
              <Shelf
                books={this.state.searchedBooks}
                shelf="none"
                updateShelf={this.props.updateShelf}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
