import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    changeBookshelf: PropTypes.func.isRequired
  }

  render() {
    let backgroundImage
    if (this.props.book.imageLinks) {
      backgroundImage = `url(${this.props.book.imageLinks.thumbnail})`
    } else {
      backgroundImage = ''
    }
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: backgroundImage }}>
          </div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf}
              onChange={(event) => this.props.changeBookshelf(this.props.book, event.target.value)}>
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

export default Book
