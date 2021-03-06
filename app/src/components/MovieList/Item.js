import React from 'react'
import { Button } from 'antd';
import './item.css'
export default function MovieItem(props) {
  return (
    <a href="javascript:;" className="movie-item">
      <img className="image" src={props.image} />
      <div className="content">
        <div className="top">
          <h3 className="title">{props.title}</h3>
          <p className="info">{props.type === '电影' ? props.type : `更新至${props.number}集`}</p>
        </div>
        <Button type="primary">订阅更新</Button>
      </div>
    </a>
  )
}
