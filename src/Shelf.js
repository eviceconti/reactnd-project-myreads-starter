import React from 'react'

const Shelf = (props) =>  {
  
  return (
    props.books
      .filter(book => book.shelf === props.shelf)
        .map(b => (
          <li key={b.title}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      b.imageLinks.thumbnail
                    })`
                  }}
                />
                <div className="book-shelf-changer">
                  <select>
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{b.title}</div>
              {//map authors to show all authors
                b.authors.map(author => (
                  <div className="book-authors" key={author}>{author}</div>
                ))}
            </div>
          </li>
        ))
  )
}

export default Shelf