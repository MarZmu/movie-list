import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggleWatched = this.toggleWatched.bind(this);
  }

  toggleWatched(e) {
    //change color
    console.log(e.target.className);
    var button = e.target;
    if (button.className === 'watched'){
     button.className = 'not-watched';
    } else {
     button.className = 'watched';
    }
    this.props.toggleWatch(this.props.movie);
  };

  render() {
    return (
      <li>
        {this.props.movie.title}
        <button
          onClick={this.toggleWatched}
          className={this.props.movie.watched ? 'not-watched' : 'watched'}>
          {this.props.movie.watched ? 'Watched' : 'Not Watched'}
        </button>
      </li>
    );
  }
}

export default ListItem;