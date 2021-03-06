import React from 'react'
import MovieItem from './Item';
import './index.css'
export default function MovieList(props) {
  return (
    <div className="movie-list">
      {
        props.list.map((item, index) => (
          <MovieItem {...item} key={index} />
        ))
      }
    </div>
  )
}
