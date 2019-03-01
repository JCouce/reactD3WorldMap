import React, { Component } from 'react';
import './App.css';
import WorldMap from './WorldMap';
import { scaleThreshold } from 'd3-scale'
import dataFeed from './resources/worldmap-dataexample.json';

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {
  constructor(props){
    super(props)
    this.state = { screenWidth: 1000, screenHeight: 500, hover: "none", brushExtent: [0,40], data: dataFeed }

  }

  onHover = (d) => {
    this.setState({ hover: d.id })
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>D3 Chart playground :)
          </h2>
        </div>
        <div className={'bar'}>
        <ul>{this.state.data.map((element, i) => <li key={i}>{element.label}</li>)}</ul>
        <WorldMap data={this.state.data} hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} />
        </div>
      </div>
    )
  }
}

export default App;
