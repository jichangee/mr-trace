import './App.css'
import { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { setLoading } from './redux/actions'
import SearchInput from './components/SearchInput'
import MovieList from './components/MovieList'
// import EmailBox from './components/EmailBox'
import { Button } from 'antd'
import axios from 'axios'
function App(props) {
  const [movieList, setMovieList] = useState([])
  const [isNone, setIsNone] = useState(false)
  // const emailRef = useRef()
  function onSearch(keyword) {
    setMovieList([])
    props.setLoading(true)

    axios
      .get('http://localhost:8090/search?f=true&q=' + keyword)
      .then((res) => {
        if (res.status === 200) {
          console.log('res', res)
          const data = res.data.data
          setMovieList(data)
          setIsNone(!data.length)
        }
      })
      .finally(() => {
        props.setLoading(false)
      })
  }

  // function toSubscribe() {
  //   props.history.push('/subscribe')
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">追剧先生</h1>
        <Button type="link">订阅列表</Button>
        {/* <EmailBox ref={emailRef}></EmailBox> */}
      </header>
      <SearchInput onSearch={onSearch} />
      <MovieList list={movieList} isNone={isNone} />
    </div>
  )
}

export default connect((state) => ({ loading: state.index.loading }), {
  setLoading,
})(App)
