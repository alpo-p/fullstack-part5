import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) { return null }
  if (error) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const successStyle = { ...errorStyle, color: 'green' }

export default Notification