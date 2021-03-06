import "./App.css";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import MovieList from "./components/MovieList";
function App() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  function onSearch(keyword) {
    setMovieList([])
    setLoading(true)
    fetch("http://localhost:8090/search?q=" + keyword)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.code === 200) {
          setMovieList(res.data);
        }
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">追剧先生</h1>
        <SearchInput onSearch={onSearch} loading={loading} />
      </header>
      <MovieList list={movieList} />
    </div>
  );
}

export default App;
