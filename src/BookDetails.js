import React from 'react'
import { Link } from 'react-router-dom'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import PropTypes from 'prop-types'

BookDetails.propTypes = {
  book: PropTypes.object,
  changeBookshelf: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function BookDetails(props) {

  let book = props.history.location.state.book

  let backgroundImage = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ''

  return (
    <div>
      <ScrollToTopOnMount/>
      <div style={{display:"flex"}}>
        <Link className="close-search" to='' onClick={props.history.goBack}>Close</Link>
        <div style={{ margin:"16px 24px 0 0", textAlign: "center", width: "100%" }}>{book.title}</div>
      </div>
      <div>
        <div style={{display:"flex"}}>
          <div className="book-top" style={{margin:"0 24px 24px 24px"}}>
            <img className="book-cover" alt=''
                 style={{ width: 128, height: 193, backgroundImage: backgroundImage }} />
            <div className="book-shelf-changer" style={{right: -10}}>
              <select value={book.shelf}
                      onChange={(event) => props.changeBookshelf(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div>
            {book.title &&
            (<div className="book-title">{book.title}</div>)}
            {book.subtitle &&
            (<div className="book-subtitle">{book.subtitle}</div>)}
            {book.authors &&
            (<div className="book-authors">Authors: {book.authors.join(', ')}</div>)}
            {book.pageCount &&
            (<div className="book-pagecount">Pages: {book.pageCount}</div>)}
            {book.publisher &&
            (<div className="book-publisher">Publisher: {book.publisher}</div>)}
            {book.averageRating &&
            (<div className="book-rating">Rating: {book.averageRating} from {book.ratingsCount}</div>)}
          </div>
        </div>
      </div>
      <div style={{margin:"0 24px 24px 24px"}}>{book.description}</div>
    </div>
  )
}

export default BookDetails