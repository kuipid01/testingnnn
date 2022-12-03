import React from 'react'

const Blog = ({link,title,img}) => {
   
  return (
    <div>
        <a href={link} target="_blank" rel="noreferrer">
        <img src={img} alt="" />
        </a>
    </div>
  )
}

export default Blog