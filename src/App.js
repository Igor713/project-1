import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    counter: 0
  }

  handleMoreClick = (e) => {
    e.preventDefault()
    const { counter } = this.state
    this.setState({ counter: counter + 1 })
  }

  handleLessClick = (e) => {
    e.preventDefault()
    const { counter } = this.state
    this.setState({ counter: counter - 1 })
  }

  render() {
    const { counter } = this.state
    return (
      <div className="App">
        <button onClick={this.handleLessClick}>-</button>
        <div className="counter">{counter}</div>
        <button onClick={this.handleMoreClick}>+</button>
      </div >
    )
  }
}

export default App;
