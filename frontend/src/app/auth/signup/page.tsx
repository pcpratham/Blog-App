"use client"
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'


export default function Signup() {
  return (
    <div className='authout'>
      <Navbar />
      <div className='authin'>
        <div className='left'></div>
        <div className='right'>
            <form>
                <div className='forminput_cont'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter Your Name'  />
                </div>
                <div className='forminput_cont'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter Your Email'  />
                </div>
                <div className='forminput_cont'>
                    <label>Password</label>
                    <input type='password' placeholder='Enter Password'  />
                </div>
                <div className='forminput_cont'>
                    <label>Confirm Password</label>
                    <input type='password' placeholder='Enter Password again'  />
                </div>
                <button type='submit' className='main_button'>Register</button>
                <p>Already have an account ? <Link href="/auth/signin">Login</Link> </p>
            </form>
        </div>
      </div>
    </div>
  )
}
