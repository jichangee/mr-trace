import React from 'react'
import { Input } from 'antd'
import './index.css'
import { connect } from 'react-redux'
const { Search } = Input

function SearchInput(props) {
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

export default connect((state) => ({ loading: state.index.loading }))(
  SearchInput
)
