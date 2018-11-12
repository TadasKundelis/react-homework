import React from 'react';
import Card from './Card';
import axios from 'axios';
import { endpoints } from '../../config';
import '../assets/style.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movieList: [],
      genreList: [],
      currentGenre: ""
    }
  }

  componentDidMount() {
    this.requestPopularMovies();
    this.requestGenres();
  }

  requestPopularMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((response) => {
        this.setState({
          movieList: response.data.results,
        });
      })
      .catch((error) => console.log(error.response));
  };



  requestGenres = () => {
    axios
      .get(endpoints.genres())
      .then((response) => {
        this.setState({
          genreList: response.data.genres,
        });
      })
      .catch((error) => console.log(error.response));
  };

  setCurrentGenre(genre) {
    this.setState({currentGenre: genre})
  }

  updateMovieData(id) {
    const updatedMovieList = this.state.movieList.slice();
    const updatedMovie = updatedMovieList.find(movie => movie.id === id);
    updatedMovie.isLiked = !updatedMovie.isLiked;
    this.setState({ movieList: updatedMovieList });
  }

  render() {
    const { movieList, genreList } = this.state;
    return (
      <React.Fragment>
        <ul>
          {genreList.map((genre) => (
            <li onClick={() => this.setCurrentGenre(genre)} key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        
        {movieList
          .filter(movie => 
            this.state.currentGenre ? movie.genre_ids.some(id => id === this.state.currentGenre.id) : movie)
          .map((movie) => (
            <Card updateMovieData={() => this.updateMovieData(movie.id)} key={movie.id} data={movie} />
        ))}
      </React.Fragment>
    );
  }
}

export default App;
