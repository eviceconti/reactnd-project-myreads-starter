import React from 'react'

const Shelf = (props) =>  {
  let options = [
    {value: 'move', text: 'Move to...', disabled: 'disabled'},
    {value: 'currentlyReading', text: 'Currently Reading', disabled: ''},
    {value: 'wantToRead', text: 'Want To Read', disabled: ''},
    {value: 'read', text: 'Read', disabled: ''},
    {value: 'none', text: 'None', disabled: ''}
  ]

  return (
    props.books.map(b => (
          <li key={b.id}>
            <div className="book">
              <div className="book-top">
                {b.imageLinks ? (
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
                ) : (
                  <div
                    className="book-cover book-cover-title"
                    style={{
                      width: 128,
                      height: 193,
                    }}
                  >{b.title}</div>
                )}
                
                <div className="book-shelf-changer">
                  <select 
                    defaultValue={b.shelf}
                    onChange={(e) => props.updateShelf(e.target.value, b.id)}
                  >
                    {options.map(option => (
                      <option 
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                      {option.text}
                    </option>))}
                  </select>
                </div>
              </div>
              <div className="book-title">{b.title}</div>
              {/*map authors to show all authors. Check if there is an author before*/}
              {b.authors && (b.authors.map(author => (
                  <div className="book-authors" key={author}>{author}</div>
                )))}
            </div>
          </li>
        ))
  )
}

export default Shelf