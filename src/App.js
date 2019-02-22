import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart';
import WorldMap from './WorldMap';
import { scaleThreshold } from 'd3-scale'

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {
  constructor(props){
    super(props)
    this.onHover = this.onHover.bind(this)
    this.state = { screenWidth: 1000, screenHeight: 500, hover: "none", brushExtent: [0,40] }

  }

  onHover(d) {
    this.setState({ hover: d.id })
    console.log('holaaa');
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>D3 Chart playground :)
          </h2>
        </div>
        <div className={'bar'}>

        <WorldMap hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} />
        </div>
      </div>
    )
  }
}

export default App;
