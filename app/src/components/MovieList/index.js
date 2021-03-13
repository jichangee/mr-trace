import React from 'react'
import { connect } from 'react-redux'
import MovieItem from './Item'
import { Empty, Skeleton, Space } from 'antd'
import './index.css'
function MovieList(props) {
  console.log('props', props)
  const skeletonList = new Array(3).fill('')
  return (
    <div className="movie-list">
      {props.list.length > 0 ? (
        props.list.map((item, index) => <MovieItem {...item} key={index} />)
      ) : props.loading ? (
        <>
          {skeletonList.map((item, index) => (
            <Space style={index > 0 && { marginTop: 20 }} key={index}>
              <Skeleton.Image style={{ width: 100, height: 150 }} />
              <Space direction="vertical">
                <Skeleton.Button style={{ width: 150 }} />
                <Skeleton.Button style={{ width: 100 }} />
                <Skeleton.Button style={{ width: 200, marginTop: 35 }} />
              </Space>
            </Space>
          ))}
        </>
      ) : props.isNone ? (
        <Empty description="暂无数据" />
      ) : (
        ''
      )}
    </div>
  )
}

export default connect((state) => ({ loading: state.index.loading }))(MovieList)
