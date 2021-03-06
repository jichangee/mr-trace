import React from 'react'
import './item.css'
export default function MovieItem(props) {
  return (
    <a href="javascript:;" className="movie-item">
      <img className="image" src={props.image} />
      <h3 className="title">{props.title}</h3>
      <p className="info">更新至{props.number}集</p>
    </a>
  )
}
