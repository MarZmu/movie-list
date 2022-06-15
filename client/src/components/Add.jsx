import React from 'react';

class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      addEntry: ''
    }

    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleAddChange(e) {
    this.setState({addEntry: e.target.value})
    console.log(this.state.addEntry);
  }

  handleAddClick(e) {
    e.preventDefault();
    var movieToAdd = {title: this.state.addEntry, watched: false};
    console.log(movieToAdd);
    this.props.addMov(movieToAdd);
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleAddChange}
          className='add-item'
          type='text'
          placeholder='Enter a Movie You Would like to Add'>
        </input>
        <button
          className='add-item'
          onClick={this.handleAddClick}
        >Add!</button>
      </div>
    );
  }

}

export default Add;