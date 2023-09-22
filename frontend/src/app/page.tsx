"use client"
import Navbar from '@/components/Navbar/Navbar'
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import CategoriesSlider from '@/components/Categories/CategoriesSlider'
import BlogSlider from '@/components/blogCards/BlogSlider'


export default function Home() {
  return (
    <main>
      <Navbar />
      <HomeSlider/>
      <CategoriesSlider/>
      <BlogSlider/>
      <div>
        <h1>Hello world from home page</h1>
      </div>
    </main>
  )
}
