"use client"
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'


export default function Signin() {
  return (
    <div className='authout'>
      <Navbar />
      <div className='authin'>
        <div className='left'></div>
        <div className='right'>
            <form>
                <div className='forminput_cont'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter Your Email'  />
                </div>
                <div className='forminput_cont'>
                    <label>Password</label>
                    <input type='password' placeholder='Enter Password'  />
                </div>
                <button type='submit' className='main_button'>Sign-in</button>
                <p>Don't have an account ? <Link href="/auth/signup">Register Here</Link> </p>
            </form>
        </div>
      </div>
    </div>
  )
}
