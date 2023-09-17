import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/components/Navbar/Navbar'


export default function Home() {
  return (
    <main>
      <Navbar/>
      <h1>This is a blog app.</h1>
    </main>
  )
}
