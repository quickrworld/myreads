import React from 'react'
//import PropTypes from 'prop-types'

class BookDetails extends React.Component {
  render() {
    return (
      <div>{this.props.book.title}</div>
    )
  }
}

export default BookDetails