import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className = {`w-${width} font-bold bg-gray-100 rounded-lg p-2`}>React Blog</div>
  )
}

export default Logo