import React from 'react'
import Books from './Books'
import "./combined.css"

function Card(props) {
  return (
    <div id={props.id} className='card' key={props.keys} onClick={()=>{console.log(props.keys)}}>
      <img src={props.image} alt='bookPicture' id='bookImage'></img>
      <div className='bookText'>
        <h2 id='bookTitle'>{props.title}</h2>
        <h3 id='bookAuthor'>{props.author}</h3>
      </div>
    </div>
  )
}

export default Card
