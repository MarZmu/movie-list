import React from 'react';
import Search from './Search.jsx';
import Add from './Add.jsx';

var movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      filteredMovies: [],
      noSearchResult: false,
      renderFiltered: false
    }
    this.filterMovies = this.filterMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }

  filterMovies(filter) {
    //make the filter case-insensitive
    filter = filter.toUpperCase();
    //filter out by title name
    var filteredList = this.state.movies.filter((movie) => (
        movie.title.toUpperCase().indexOf(filter) !== -1
      ));
    if (filteredList.length < 1){
      this.setState({noSearchResult: true});
    } else {
      this.setState({noSearchResult: false});
    }
    // filteredList = filteredList.length < 1 ? [{title: 'No movie found matching search criteria'}] : filteredList;
    //set the state to the filtered list of movies
    this.setState({
      filteredMovies: filteredList,
      renderFiltered: true
    });
  }

  addMovie(movie) {
    var alreadyHere = false;
    this.state.movies.forEach((movieObj) => {
      if (movieObj.title.toUpperCase() === movie.title.toUpperCase()) {
        alreadyHere = true;
      }
    })
    if (!alreadyHere){
      var currentList = this.state.movies;
      currentList.push(movie);
      this.setState({movies: currentList});
    }
  }

  render() {
    return (
      <div>
        <form>
          <Search filterMov={this.filterMovies}/>
          <Add addMov={this.addMovie} />
        </form>
        <ul>
          {(!this.state.renderFiltered) && this.state.movies.map((movie, index) => <li key={index}>{movie.title}<Watched wasWatched={movie.watched} /></li>)}
          {this.state.renderFiltered && this.state.filteredMovies.map((movie, index) => <li key={index}>{movie.title}</li>)}
          {this.state.noSearchResult && <li>No Movie Found Matching Search Criteria</li>}
        </ul>
      </div>
    )
  }
}

export default App;