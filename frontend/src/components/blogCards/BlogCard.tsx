import React from 'react'
interface Blog {
    name: string,
    path: string,
    bgColor: string
}
const BlogCard = (data:Blog) => {
    const {name, path, bgColor} = data;
  return (
    <div style={
        {
            width:'300px',
            height:'400px',
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

export default BlogCard