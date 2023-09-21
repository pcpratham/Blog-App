import React from "react";
import { BiUserCircle, BiPlus } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import logo from "@/assets/blogger-2.png";
import Image from "next/image";
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/pages/profile">
          <BiUserCircle className="icon" />
        </Link>
        <Link href="/pages/addblog">
          <BiPlus className="icon" />
        </Link>
        <Link href="/pages/search">
          <AiOutlineSearch className="icon" />
        </Link>
      </div>
      <div className="navbar-middle">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <Link href="/">Home</Link>
        <Link href="/pages/about">About</Link>
        <Link href="/pages/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
