import React from "react";
import MovieItem from "./Item";
import { Empty, Skeleton, Space } from "antd";
import "./index.css";
export default function MovieList(props) {
  return (
    <div className="movie-list">
      {props.list.length > 0 ? (
        props.list.map((item, index) => <MovieItem {...item} key={index} />)
      ) : props.loading ? (
        <>
          <Space>
            <Skeleton.Image style={{ width: 100, height: 150 }} />
            <Space direction="vertical">
              <Skeleton.Button style={{ width: 150 }} />
              <Skeleton.Button style={{ width: 100 }} />
              <Skeleton.Button style={{ width: 200, marginTop: 35 }} />
            </Space>
          </Space>
          <Space style={{ marginTop: 20 }}>
            <Skeleton.Image style={{ width: 100, height: 150 }} />
            <Space direction="vertical">
              <Skeleton.Button style={{ width: 150 }} />
              <Skeleton.Button style={{ width: 100 }} />
              <Skeleton.Button style={{ width: 200, marginTop: 35 }} />
            </Space>
          </Space>
          <Space style={{ marginTop: 20 }}>
            <Skeleton.Image style={{ width: 100, height: 150 }} />
            <Space direction="vertical">
              <Skeleton.Button style={{ width: 150 }} />
              <Skeleton.Button style={{ width: 100 }} />
              <Skeleton.Button style={{ width: 200, marginTop: 35 }} />
            </Space>
          </Space>
        </>
      ) : props.isNone ? (
        <Empty description="暂无数据" />
      ) : (
        ""
      )}
    </div>
  );
}
