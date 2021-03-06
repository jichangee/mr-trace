import React from 'react'
import { Input } from 'antd'
const { Search } = Input;

export default function SearchInput(props) {
  function onSearch(value) {
    props.onSearch && props.onSearch(value)
  }

  return (
    <div className="search">
      <Search
        placeholder="输入搜索关键字"
        allowClear
        enterButton="搜索"
        size="large"
        loading={props.loading}
        onSearch={onSearch}
      />
    </div>
  )
}
