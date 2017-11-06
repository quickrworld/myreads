import React from 'react'

class ScrollToTopOnMount extends React.Component {
  componentDidMount(props) {
    window.scrollTo(0, 0)
  }
  render() {
    return null
  }
}

export default ScrollToTopOnMount

// ReactTraining / react-router
