import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <h2>What is an attribute closure?</h2>
        <p>
          An attribute closure is the set of all attributes that can be
          functionally derived from a given set of functional dependencies
        </p>
        <br/>
        <h3>Click <a href="https://en.wikipedia.org/wiki/Functional_dependency" target="_blank">here</a> to learn more about functional dependencies and closures</h3>
        <br/>
        <Link to='/' className='btn' >Go back</Link>
    </div>
  )
}

export default About

