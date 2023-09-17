import React from 'react'
import {BiUserCircle,BiPlus} from "react-icons/bi"
import Link from 'next/link'


const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-left'>
            <Link href="/profile">
                <BiUserCircle classname="icon" />
            </Link>
            <Link href="/add" >
                <BiPlus className="icon" />
            </Link>
        </div>
        <div className='navbar-middle'></div>
        <div className='navbar-right'></div>
    </nav>
  )
}

export default Navbar