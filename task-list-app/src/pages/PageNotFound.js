import React from 'react'
import {Link} from "react-router-dom"

function PageNotFound() {
  return (
      <div>
          <h1>Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist. Go back to: <Link to="/">Home Page</Link></p>
          
    </div>
  )
}

export default PageNotFound