import React from 'react'
import styles from './header.module.css';
import logo from '../../assets/images/logo.png'
function Header() {
    return (
        <header>
            <nav className='d-flex align-items-center justify-content-between w-100 bg-white py-2 px-3 border-bottom'>
                <div className='d-flex align-items-center'>
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt='auto1 logo' width={160}/>
                    </a>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div>Purchase</div>
                    <div className='mx-3'>My Orders</div>
                    <div>Sell</div>
                </div>
            </nav>
        </header>
    )
}

export default Header