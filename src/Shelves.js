import React, { Component } from "react"
import { Link } from "react-router-dom"
import Shelf from './Shelf'

class Shelves extends Component {

  /*
  shelves array used to render all the shelves using the .map()
  */
  shelves = [
    {
      title: 'Currently Reading',
      shelf: 'currentlyReading'
    },
    {
      title: 'Want to Read',
      shelf: 'wantToRead'
    },
    {
      title: 'Read',
      shelf: 'read'
    }
  ]

  render() {

    //check if the promise already returned any value from API. If not, show a Loading message to avoid an error message
    return !this.props.books ? (
      <div>Loading...</div>
    ) : (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.shelves.map(shelf => (
            <div key={shelf.title}>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {/*
                    The Shelf component renders all books passed via props. 
                    Only the books of 1 specific shelf is passed each time using the .filter
                    The updateShelf method is received from App and passed to the Shelf also
                    */}
                    <Shelf 
                      books={this.props.books.filter(book => book.shelf === shelf.shelf)} 
                      shelf={shelf.shelf}
                      updateShelf={this.props.updateShelf} />
                  </ol>
                </div>
            </div>
          </div>
        ))}
        </div>
        <div className="open-search">
          {/*link from react-router*/}
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Shelves;
