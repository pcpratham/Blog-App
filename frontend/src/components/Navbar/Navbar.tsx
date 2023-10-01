"use client";
import React from "react";
import { useState,useEffect } from "react";
import { BiUserCircle, BiPlus } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import logo from "@/assets/blogger-2.png";
import Image from "next/image";
import "./Navbar.css";
import {toast} from "react-toastify"
import { getCookie,setCookie,deleteCookie } from "cookies-next";
import { error } from "console";
const Navbar = () => {
  const [auth, setAuth] = useState<Boolean>(false);
  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((res)=>{
      return res.json();
    }).then((response)=>{
      if(response.success){
        setAuth(true);
      }else{
        setAuth(false);
      }
    }).catch((err)=>{
      toast(err.message,{
        type:'error',
        position:'top-right',
        autoClose: 2000
      })
    })
  }

  useEffect(()=>{
    checkLogin();
  },[]);

  const handleLogout = async () => {
    await deleteCookie('authToken');
    await deleteCookie('refreshToken');
    window.location.href = "/pages/auth/signin"
  }
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
      {auth ? (
        <div className="navbar-right">
          <Link href="/">Home</Link>
          <Link href="/pages/about">About</Link>
          <Link href="/pages/contact">Contact</Link>
          <button onClick={handleLogout}>Log-Out</button>
        </div>
      ) : (
        <div className="navbar-right">
          <Link href="/pages/auth/signin">
            <button>Login</button>
          </Link>
          <Link href="/pages/auth/signup">
            <button>Sign-Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
