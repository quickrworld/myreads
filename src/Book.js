import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  handleChange = (event) => {
    this.props.changeBookshelf(this.props.book, event.target.value)
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}>
          </div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors && this.props.book.authors.join(', ')}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookshelf: PropTypes.func.isRequired
}

export default Book
