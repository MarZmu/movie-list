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
      currentFilter: '',
      renderFiltered: false,
      //toggles watched or to watch
      renderWatched: false,
      renderUnwatched: false
    }

    this.toggleWatchedProp = this.toggleWatchedProp.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.toggleWatchedMovies = this.toggleWatchedMovies.bind(this);
  }

  filterMovies(filter = this.state.currentFilter, watched) {
    //filter out by title name
    filter = filter.toUpperCase();
    var filteredList = this.state.movies.filter((movie) => (
        movie.title.toUpperCase().indexOf(filter) !== -1
      ));

    //if nothing in list, show list item no match
    if (filteredList.length < 1 && filter.length > 0){
      this.setState({noSearchResult: true});
    } else {
      this.setState({noSearchResult: false});
    }

    if(watched) {
      filteredList = filteredList.filter((movie)=> {
        console.log('here in filter1')
        return movie.watched === true;
      });
    } else if (watched === false) {
      filteredList = filteredList.filter((movie)=> {
        console.log('here in filter2')
        return movie.watched === false;
      });
    } else {
      this.setState({
        currentFilter: filter,
        renderFiltered: true
      });
    }
    console.log(filteredList);
    //set the state to the filtered list of movies

    this.setState({
      filteredMovies: filteredList,
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

    //if not duplicate, movielist is updated, renders full, unfiltered movie list
    if (!alreadyHere){
      var currentList = this.state.movies;
      currentList.push(movie);
      this.setState({
        movies: currentList,
        renderFiltered: false,
        noSearchResult: false
      });
    }

    this.setState({currentFilter: ''});
    this.filterMovies();
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
    this.filterMovies();
  }

  toggleWatchedMovies(e) {
    //if the button clicked is watched
    var wantWatched = e.target.textContent === 'Watched';

    this.setState({
      renderWatched: (wantWatched ? true : false),
      renderUnwatched: (wantWatched ? false : true)
    })

    console.log(this.state.renderWatched, this.state.renderUnwatched);
    //if filtered already, filter current list for watched or unwatched
    //  pass filter watched param
    //otherwise
    //  pass filter empty string and watched param
    this.filterMovies(this.state.currentFilter, wantWatched);
  }



  render() {
    return (
      <div id='container'>
        <form id="search-add-form">
          <Search filterMov={this.filterMovies}/>
          <Add addMov={this.addMovie} />
        </form>
        <div id='list-box'>
          <button
            onClick={this.toggleWatchedMovies}
            className='watch-filter'>To Watch</button>
          <button
            onClick={this.toggleWatchedMovies}
            className='watch-filter'>Watched</button>
          <ul>
            {/* depending on state, renders full opr filtered list, OR list item saying none matching */}
            {(this.state.renderFiltered === false) && this.state.movies.map((movie,index) => <ListItem key={index} movie={movie} toggleWatch={this.toggleWatchedProp}/>)}
            {this.state.renderFiltered && this.state.filteredMovies.map((movie,index) => <ListItem key={index} movie={movie} toggleWatch={this.toggleWatchedProp}/>)}
            {this.state.noSearchResult &&  <li>No Movie Found Matching Search Criteria</li>}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;