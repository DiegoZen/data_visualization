import React, { Component } from 'react';
import './App.css';
import API from './services/api';
import Form from './components/Form'
import {calculateAvg, readableData} from './utils/utils'
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot, 
  XAxis,
  YAxis,
  LineMarkSeries,
  HorizontalGridLines,
  VerticalGridLines,
  Borders
} from 'react-vis';


const myApi = new API()

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      hoverData: null,
      domain: [],
      avg: null
    }
    this.filterData = this.filterData.bind(this)
    this.selectScale = this.selectScale.bind(this);
    this.scaleDomainRel = this.scaleDomainRel.bind(this);
  } 
  
  componentDidMount() {
    const scale = localStorage.getItem('scaleSelection') ?? ''
    this.scaleDomainRel(scale)
    
    myApi.fetchMetrics().then((metrics) => {
      const filteredData = this.filterData(metrics)
      var avg;

      if (filteredData.length !== 0) avg = calculateAvg(filteredData)
      else avg = null

      this.setState({
        data: metrics,
        avg: avg
      })
    });
  }


  filterData(data) {
    const start = this.state.domain[0].getTime()
    const end = this.state.domain[1].getTime()

    const filteredData = data.filter(function(d) { return d.x >= start && d.x <= end });
    return filteredData
  }

  async scaleDomainRel(scale) {
    switch (scale) {
      case 'day':
        this.setState({domain: [new Date(new Date().setDate(new Date().getDate() -1)), new Date()]});
        break;
      case 'hour':
        this.setState({domain: [new Date(new Date().setHours(new Date().getHours() -1)), new Date()]});
        break;
      case 'minute':
        this.setState({domain: [new Date(new Date().setMinutes(new Date().getMinutes() -1)), new Date()]});
        break;
      default:
        this.setState({domain: [new Date(new Date().setDate(new Date().getDate() -1)), new Date()]});
    }
    
  }

  async selectScale(event) {
    const scale = event.target.value;
    localStorage.setItem('scaleSelection', scale);
    await this.scaleDomainRel(scale)

    const filteredData = this.filterData(this.state.data)
    if (filteredData.length !== 0)
    {
      const avg = calculateAvg(filteredData)
      this.setState({avg: avg})
    }
    else this.setState({avg: null})
  } 

  

  render() {

    const {hoverData, avg} = this.state

    return (
      <div id="wrapper">
      <h1 className="text">Data Visualization</h1>
    
      {!!avg ? <h2 className="text">Average Value: {avg}</h2> : <h2 className="text">Enter some metrics</h2>}
        <Form />
      
      <div id="container" className="graph">
      <XYPlot 
        xDomain={this.state.domain}
        xType='time'
        yPadding={30} 
        width={1100} 
        height={400}
        margin={{left: 50}}
      >
      <HorizontalGridLines />
      <VerticalGridLines />
      
      <LineMarkSeries
            color="white"
            onValueClick={(d) => this.setState({hoverData: readableData(d)})}
            onValueMouseOver={(d) => this.setState({hoverData: readableData(d)})}
            onValueMouseOut={() => this.setState({hoverData: null})}
            data={this.state.data}
          />
      <Borders style={{all: {fill: 'dodgerblue'}}} />
      <XAxis title="Time" style={{text: {fill: 'white'}, title: {fill: 'white'}}} />
      <YAxis title="Value" style={{text: {fill: 'white'}, title: {fill: 'white'}}} />
    </XYPlot>
    </div>
    {!!hoverData ? 
          <h2 className="text">Name: {hoverData.name}, Time: {hoverData.x}, Value: {hoverData.y}</h2>  :
          <h2 className="text">Hover the dots to see details</h2>
        }
    <div className="scale">
    <label>Choose a scale of time</label>
      <select 
        value={localStorage.getItem('scaleSelection')} 
        name="scale" 
        id="scale" 
        className="scale-select"
        onChange={this.selectScale}
      >
        <option value="day">Dia</option>
        <option value="hour">Hora</option>
        <option value="minute">Minuto</option>
      </select>
      <br></br>
    
      </div>
    </div>
    );
  }
}

export default App;
