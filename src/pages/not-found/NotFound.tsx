import React from 'react'
import styles from './notFound.module.css'
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
      <img src={logo} alt='auto1 logo' width={250} />
      <h3 className='my-3'>
        404 - Not Found
      </h3>
      <p>
        Sorry, the page you are looking for does not exist.
      </p>
      <p>
        you can always go back to the <Link to='/' className="text-orange">homepage</Link>
      </p>
    </div>
  )
}

export default NotFound