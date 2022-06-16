import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEntry: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    //prevent refresh, and invoke the filter function with the entry value
    this.props.filterMov(this.state.searchEntry);
  }

  handleSearchChange(e) {
    //set the entry state to the value of the input bar
    this.setState({searchEntry: e.target.value});

    //if search bar entry is left emtpy, redisplay entire list
    if(e.target.value === '') {
      this.props.filterMov('');
    }
  }

  render() {
    return (
      <div id='search'>
        <input
        onChange={this.handleSearchChange}
        className='search-item'
        type='text'
        placeholder='Search..'></input>
      <button
        onClick={this.handleClick}
        className='search-item'
        >Go!</button>
      </div>
    );
  }
}


export default Search;