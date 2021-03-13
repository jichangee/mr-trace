import React from 'react'
import { Button, message } from 'antd';
import BASE_URL from '../../config'
import axios from 'axios'
import './item.css'
import { connect } from 'react-redux';
function MovieItem(props) {
  function subscribe() {
    axios.post(BASE_URL + '/subscribe', {
      ...props
    }).then(res => {
      if (res.status === 200) {
        message.success(res.data.msg)
      } else {
        message.warning(res.data.msg)
      }
    })
  }
  return (
    <a href="javascript:;" className="movie-item">
      <img className="image" src={props.image} />
      <div className="content">
        <div className="top">
          <h3 className="title">{props.title}</h3>
          <p className="info">{props.type === '电影' ? props.type : `更新至${props.number}集`}</p>
        </div>
        <Button type="primary" onClick={subscribe}>订阅更新</Button>
      </div>
    </a>
  )
}

export default connect(state => ({
  email: state.index.email
}))(MovieItem)