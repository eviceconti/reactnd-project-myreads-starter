import React, { Component } from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import Shelf from "./Shelf"

class Search extends Component {
  state = {
    query: "",
    searchedBooks: []
  };

  handleInputChange(query) {
    this.setState({ query })
    if (query.trim() !== "") {
      this.searchAPI(query.trim())
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

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
            {this.state.searchedBooks && (
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
