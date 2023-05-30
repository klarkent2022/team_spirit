import React from 'react'

import { loader } from '../../assets/';
import './loader.scss'

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" className="cell"/>
      <p className="parag">Please wait...</p>
    </div>
  )
}

export default Loader