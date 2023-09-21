import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import CategoryCard from './CategoryCard';


const CategoriesSlider = () => {


    const Categories = [
        {
            name:"Category 1",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 2",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 3",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 4",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 5",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 6",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 7",
            path:"#",
            bgColor:generate()
        },
        {
            name:"Category 8",
            path:"#",
            bgColor:generate()
        },

    ]

    function createHex() {
        var hexCode1 = "";
        var hexValues1 = "0123456789abcdef";
    
        for (var i = 0; i < 6; i++) {
          hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
        }
        return hexCode1;
      }
    
      function generate() {
    
        var deg = Math.floor(Math.random() * 360);
    
        var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() + ")";
        console.log(gradient);
        return gradient;
      }


  return (
    <div>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            Categories.map((category) =>{

                return (
                    <SwiperSlide>
                        <CategoryCard {...category} />
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </div>
  )
}

export default CategoriesSlider