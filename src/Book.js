import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
  selectBook: PropTypes.func.isRequired
}

function Book(props) {
  let backgroundImage
  if (props.book.imageLinks) {
    backgroundImage = `url(${props.book.imageLinks.thumbnail})`
  } else {
    backgroundImage = ''
  }
  return (
    <div className="book">
      <div className="book-top">
        <Link
          onClick={(event) => props.selectBook(props.book)}
          to={{
            pathname: '/bookdetails',
            state: { book: props.book }
          }}
          className="book-cover shadowfilter"
          style={{ width: 128, height: 193, backgroundImage: backgroundImage }} />
        <div className="book-shelf-changer">
          <select value={props.book.shelf}
            onChange={(event) => props.changeBookshelf(props.book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
    </div>
  )
}

export default Book
