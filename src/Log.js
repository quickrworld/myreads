import React from 'react'
import PropTypes from 'prop-types'

Log.propTypes = {
  message: PropTypes.string.isRequired,
  resetMessage: PropTypes.func.isRequired
}

function Log(props) {
  const message = props.message

  return (
    <div style={{
      display: "flex",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      position:"fixed", bottom:0, left:0,
      margin: "10px",
      zIndex: 1,
      backgroundColor: "red"
    }}>
      {message &&(
        <div style={{padding:"12px", color:"white"}}>{message}</div>
      )}
      {message &&
      (<div><button
        style={{backgroundColor: "white", margin: "10px", color: "gray", fontSize: "14px"}}
        onClick={props.resetMessage}>OK</button></div>)}
    </div>
  )
}

export default Log