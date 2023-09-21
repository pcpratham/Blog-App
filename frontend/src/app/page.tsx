"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/components/Navbar/Navbar'
import HomeSlider from '@/components/HomeSlider/HomeSlider'


export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeSlider/>
      <div>
        <h1>Hello world from home page</h1>
      </div>
    </main>
  )
}
