import React from 'react';

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
      filteredMovies: movies
    }
    this.filterMovies = this.filterMovies.bind(this);
  }

  filterMovies(filter) {
    //make the filter case-insensitive
    filter = filter.toUpperCase();
    //filter out by title name
    var filteredList = movies.filter((movie) => (
        movie.title.toUpperCase().indexOf(filter) !== -1
      ));
    filteredList = filteredList.length < 1 ? [{title: 'No movie found matching search criteria'}] : filteredList;
    //set the state to the filtered list of movies
    this.setState({
      filteredMovies: filteredList
    });
  }

  addMovie(movie) {
    var alreadyHere = false;
    movies.forEach((movieObj) => {
      if (movieObj.title.toUpperCase() === movie.title.toUpperCase()) {
        alreadyHere = true;
      }
    })
    if (!alreadyHere){
      movies.push(movie);
    }
  }

  render() {
    return (
      <div>
        <Search addMovie={this.addMovie} onSubmit={this.filterMovies}/>
        <ul>
        {this.state.filteredMovies.map((movie, index) => <li key={index}>{movie.title}</li>)}
        </ul>
      </div>
    )
  }
}


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEntry: '',
      addEntry: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleSubmit(e) {
    //prevent refresh, and invoke the filter function with the entry value
    e.preventDefault();
    this.props.onSubmit(this.state.searchEntry);
  }

  handleSearchChange(e){
    //set the entry state to the value of the input bar
    this.setState({searchEntry: e.target.value});

    //if search bar entry is left emtpy, redisplay entire list
    if(e.target.value === '') {
      this.props.onSubmit('');
    }
  }

  handleAddChange(e) {
    this.setState({addEntry: e.target.value})
    console.log(this.state.addEntry);
  }

  handleAddClick() {
    var movieToAdd = {title: this.state.addEntry};
    this.props.addMovie(movieToAdd);
  }



  render() {
    return (
      <form
        id='search-add-form'
        onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleAddChange}
          className='form-item'
          type='text'
          placeholder='Enter a Movie You Would like to Add'>
        </input>
        <button
          onClick={this.handleAddClick}
        >Add!</button>
        <input
          onChange={this.handleSearchChange}
          className='form-item'
          type='text'
          placeholder='Search..'></input>
        <button
          className='form-item'
          type='submit'>Go!</button>
      </form>
    );
  };
};




export default App;