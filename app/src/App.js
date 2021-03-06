import "./App.css";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import MovieList from "./components/MovieList";
import { Button } from 'antd'
function App() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNone, setIsNone] = useState(false);
  function onSearch(keyword) {
    setMovieList([])
    setLoading(true)
    fetch("http://localhost:8090/search?q=" + keyword)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.code === 200) {
          const data = res.data
          setMovieList(data);
          setIsNone(!data.length)
        }
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">追剧先生</h1>
        <Button type="link">设置邮箱</Button>
      </header>
      <SearchInput onSearch={onSearch} loading={loading} />
      <MovieList list={movieList} loading={loading} isNone={isNone} />
    </div>
  );
}

export default App;
