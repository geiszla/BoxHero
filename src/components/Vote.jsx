import { Button, Col, FormControl, FormGroup } from 'react-bootstrap';

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import sendQuery from '../graphql';

@observer
export default class Vote extends React.Component {
  @observable movies = [];
  @observable newMovie = {};

  componentDidMount () {
    sendQuery(
      `{getMovies {
          _id
          title
      }}`
    , (data) => {
      this.movies = data.getMovies;
    });
  }

  handleKeyUp () {
    const searchInput = document.getElementById('searchField').value;
    if (searchInput !== '') {
      this.newMovie = { title: searchInput };
    } else {
      this.newMovie = {};
    }
  }

  render () {
    const movies = this.movies;

    const movieList = movies.map(currMovie => (
      <Movie key={currMovie._id} value={currMovie.title} />
      ));

    const newMovie = this.newMovie;
    const isNewMovieVisible = (Object.keys(newMovie).length !== 0 ||
      newMovie.constructor !== Object) ? 'block' : 'none';

    return (
      <div>
        <FormGroup>
          <Col sm={3}>
            <FormControl type='text' placeholder='Add new movie' id='searchField' onKeyUp={() => this.handleKeyUp()} />
          </Col>
          <Button>Add</Button>
        </FormGroup>
        <div style={{ display: isNewMovieVisible }}>
          <Movie value={newMovie.title} />
        </div>
        <div>{movieList}</div>
        <div>
          <Button>Vote</Button>
          <Button>See Results</Button>
        </div>
      </div>
    );
  }
}

@observer
class Movie extends React.Component {
  render () {
    const imageSource = 'https://images.vexels.com/media/users/3/130321/isolated/lists/ad5bee5bc7999f5b3c2a0fd59aba73c9-film-strip-icon.png';

    return (
      <div>
        <img alt='Movie poster placeholder' src={imageSource} />
        <div>{this.props.value}</div>
      </div>
    );
  }
}
