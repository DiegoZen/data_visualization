import React, { Component } from 'react';
import './css/Form.css'
import API from '../services/api'

const myApi = new API()

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: ''
        };
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleValueChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit = async e => {
        if (this.state.name !== '' && this.state.value !== null) {
            await myApi.postMetric(this.state)
            alert(`A metric was submitted: \nName: ` + this.state.name +`\nValue: ` + this.state.value);
        }
        e.preventDefault();
    }

    render() {
        return (
            <form className="form row" onSubmit={this.handleSubmit}>

            <input className="column" id="input-name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
            
            <br></br>

            <input className="column" id="input-value" type="number" placeholder="Value" value={this.state.value} onChange={this.handleValueChange} />
            
            <br></br>
            <input className="column" type="submit" value="Submit" />
            </form>
        );
    }
}

export default Form