import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

BookDetails.propTypes = {
  currentLocation: PropTypes.object,
  history: PropTypes.object.isRequired
}

function BookDetails(props) {
  let backgroundImage
  if (props.book.imageLinks) {
      backgroundImage = `url(${props.book.imageLinks.thumbnail})`
  } else {
      backgroundImage = ''
  }
  return (
    <div>
      <div style={{display:"flex"}}>
        <Link className="close-search" to='' onClick={props.history.goBack}>Close</Link>
        <div style={{ margin:"16px 24px 0 0", textAlign: "center", width: "100%" }}>{props.book.title}</div>
      </div>
      <div>
        <div style={{display:"flex"}}>
          <div className="book-top" style={{margin:"24px"}}>
            <img
                alt={props.book.title}
                className="book-cover"
                style={{ width: 128, height: 193, backgroundImage: backgroundImage }} />
          </div>
          <div style={{ margin:"24px 0 0 0" }}>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors}</div>
          </div>
        </div>
      </div>
      <div style={{margin:"0 24px 24px 24px"}}>{props.book.description}</div>
    </div>
  )
}

export default BookDetails