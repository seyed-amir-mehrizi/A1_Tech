import React from 'react'
import styles from './header.module.css';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header className={styles.headerStyle}>
            <nav className='d-flex align-items-center justify-content-between w-100 bg-white py-2 px-3 border-bottom'>
                <div className='d-flex align-items-center'>
                    <Link to='/' className="navbar-brand">
                        <img src={logo} alt='auto1 logo' width={160} />
                    </Link>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='mx-3 cursor-pointer accent-text'> 
                        <Link to='/favorite-collection' className='accent-text'>
                            Favorites collection
                        </Link>
                    </div>
                    <div className='cursor-pointer'>Purchase</div>
                    <div className='mx-3 cursor-pointer'>My Orders</div>
                    <div className='cursor-pointer'>Sell</div>
                </div>
            </nav>
        </header>
    )
}

export default Header