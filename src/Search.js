import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class Search extends Component {
  state = {
    query: "",
    searchedBooks: []
  };

  handleInputChange(query) {
    this.setState({ query })
    if (query !== "") {
      this.searchAPI(query.trim())
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  clearQuery = () => {
    this.setState({ query: "" });
  };

  searchAPI(query) {
    BooksAPI.search(query).then(searchedBooks => {
      if (searchedBooks.length !== 0) {
        searchedBooks.forEach(book => book.shelf = 'none')
        this.setState({ searchedBooks })
      } else {
        this.setState({ searchedBooks: [] })
      }
    });
    //console.log(this.state.searchedBooks)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
            {(this.state.searchedBooks.length === 0) ? (<div />) : (
              <Shelf
              books={this.state.searchedBooks}
              shelf='none'
              updateShelf={this.props.updateShelf}
              />
              )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search