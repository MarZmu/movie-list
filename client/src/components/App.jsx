import React from 'react';
import Search from './Search.jsx';
import Add from './Add.jsx';
import ListItem from './ListItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //stays constant, full list of movies, only added to
      movies: [],
      //derived from movies based on search bars input
      filteredMovies: [],
      //causes display of 'no matching movies'
      noSearchResult: false,
      //toggles rendering full list or filtered
      renderFiltered: false,
      //toggles watched or to watch
      renderWatched: false,
      renderUnwatched: false
    }

    this.toggleWatchedProp = this.toggleWatchedProp.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }

  filterMovies(filter) {
    //filter out by title name
    filter = filter.toUpperCase();
    var filteredList = this.state.movies.filter((movie) => (
        movie.title.toUpperCase().indexOf(filter) !== -1
      ));

    //if there is nothing in the search bar, reverts to full list
    if (filteredList.length < 1){
      this.setState({noSearchResult: true});
    } else {
      this.setState({noSearchResult: false});
    }

    //set the state to the filtered list of movies
    this.setState({
      filteredMovies: filteredList,
      renderFiltered: true
    });
  }

  addMovie(movie) {
    //recieves movie object (title and watched keys)

    //checking for duplicate video
    var alreadyHere = false;
    this.state.movies.forEach((movieObj) => {
      if (movieObj.title.toUpperCase() === movie.title.toUpperCase()) {
        alreadyHere = true;
      }
    })

    //if not duplicate, movielist is updated, renders full movie list
    if (!alreadyHere){
      var currentList = this.state.movies;
      currentList.push(movie);
      this.setState({
        movies: currentList,
        renderFiltered: false
      });
    }
  }


  toggleWatchedProp(watchedMovie){
    //updates the watched property of the movie toggled
    this.state.movies.forEach((movie) => {
      if (watchedMovie.title === movie.title){
        movie.watched = !movie.watched;
      }
    });
    //reset the state to rerender
    this.setState({movies: this.state.movies})
  }

  toggleWatchedMovies(e) {
    var wantWatched = e.target.value === 'Watched'
    console.log(e.target.textContent);
  }



  render() {
    return (
      <div>
        <form>
          <Search filterMov={this.filterMovies}/>
          <Add addMov={this.addMovie} />
        </form>
        <div id='list-box'>
          <button
            onClick={this.toggleWatchedMovies}
            className='inactive'>Watched</button>
          <button
            onClick={this.toggleWatchedMovies}
            className='inactive'>To Watch</button>
          <ul>
            {/* depending on state, renders full opr filtered list, OR list item saying none matching */}
            {(!this.state.renderFiltered) && this.state.movies.map((movie,index) => <ListItem key={index} movie={movie} toggleWatch={this.toggleWatchedProp}/>)}
            {this.state.renderFiltered && this.state.filteredMovies.map((movie,index) => <ListItem key={index} movie={movie} toggleWatch={this.toggleWatchedProp}/>)}
            {this.state.noSearchResult &&  <li>No Movie Found Matching Search Criteria</li>}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;