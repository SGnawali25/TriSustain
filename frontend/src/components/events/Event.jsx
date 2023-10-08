import React from 'react'
import { Link } from 'react-router-dom'

const event = (prop) => {

  return (
    <div className= {`col-sm-12 col-md-6 col-lg-${prop.col} my-3`}>
        <Link to = {`/event/${prop.id}`}>
          <div className="card p-3 rounded">
              <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                      {prop.name}
                  </h5>
              </div>
          </div>

        </Link>
      </div>
  )
}

export default event