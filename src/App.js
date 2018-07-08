import React from 'react'
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css'

import Shelves from './Shelves'
import Search from './Search'

class BooksApp extends React.Component {
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Shelves} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp
