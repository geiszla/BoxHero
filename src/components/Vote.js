import React from 'react';
import { sendQuery } from '../graphql.js';

export default class Vote extends React.Component {
  constructor () {
    super();

    this.state = {
      movies: []
    };
  }

  componentDidMount () {
    sendQuery(
      `{getMovies {
          _id
          title
      }}`
    , (data) => {
      const movies = data.getMovies;
      this.setState({
        movies: movies
      });
    });
  }

  render () {
    const movies = this.state.movies;

    const movieList = movies.map((currMovie, movieNumber) => {
      return (
        <Movie key={currMovie._id} value={currMovie.title} />
      );
    });

    return (
      <div>
        <input type='text' />
        <button>Search</button>
        <div>{movieList}</div>
        <button>Vote</button>
        <button>See Results</button>
      </div>
    );
  }
}

class Movie extends React.Component {
  render () {
    const imageSource = 'https://images.vexels.com/media/users/3/130321/isolated/lists/ad5bee5bc7999f5b3c2a0fd59aba73c9-film-strip-icon.png';

    return (
      <div>
        <img src={imageSource} />
        <div>{this.props.value}</div>
      </div>
    );
  }
}
