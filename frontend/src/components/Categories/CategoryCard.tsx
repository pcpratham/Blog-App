import React from 'react'
interface category {
    name: string,
    path: string,
    bgColor: string
}
const CategoryCard = (data:category) => {
    const {name, path, bgColor} = data;
  return (
    <div style={
        {
            width:'300px',
            height:'200px',
            background:bgColor,
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
        }
    }>
        <p style={{
            color:'white',
            fontSize:'15px',
        }}>
            {name}
        </p>
    </div>
  )
}

export default CategoryCard