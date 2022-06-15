// import React from 'react';

// class Watched extends React.Component {
//   constructor (props) {
//     super(props);
//     this.toggleWatched.bind(this);
//   }

//   toggleWatched(e) {
//     //change color
//     console.log(e.target.className);
//     var button = e.target;
//     if (button.className === 'watched'){
//      button.className = 'not-watched';
//     } else {
//      button.className = 'watched';
//     }
//     props.changeWatched();
//   };

//   render() {
//     return (
//     <button
//         onClick={this.toggleWatched}
//         className='watched'
//     >{this.props.wasWatched ? 'Not Watched' : 'Watched'}</button>
//     );
//   }

// }

// export default Watched