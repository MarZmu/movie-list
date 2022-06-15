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

  render() {
    return (
      <div>
        <Search onSubmit={this.filterMovies}/>
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
    this.state = {entry: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    //prevent refresh, and invoke the filter function with the entry value
    e.preventDefault();
    this.props.onSubmit(this.state.entry);
  }

  handleChange(e){
    //set the entry state to the value of the input bar
    this.setState({entry: e.target.value});

    //if search bar entry is left emtpy, redisplay entire list
    if(e.target.value === '') {
      this.props.onSubmit('');
    }
  }


  render() {
    return (
      <form
        onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          className='search'
          type='text'
          placeholder='Search..'></input>
        <button
          className='search'
          type='submit'>Go!</button>
      </form>
    );
  };
};




export default App;