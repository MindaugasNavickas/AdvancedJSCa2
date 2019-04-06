import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateVehicle extends Component {
  constructor(props) {
    super(props);
    // store form fields in state
    this.state = {make: '', model: '', year: '', engineSize: '', fuelType: '', price: '', description:'', picture: '', userId: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // componentDidMount() {
  //   // when this Component mounts, fetch data relating to the user to be edited
  //   // the user's ID is passed in via the URL and accessed via props
  //   axios.get('/api/user/' + this.props.match.params.id)
  //     .then(response => {
  //       this.setState({
  //         userId: response.data._id
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }


  handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
    const name = event.target.name;
    const value = event.target.value;
    console.log(this.props.history.state);
    this.setState({[name]: value, userId: this.props.history.state._id});
  }

  handleSubmit(event) {
    event.preventDefault();
    // send a POST request to the server
    // the request includes the state, which is the info. for the new user to be created
    axios.post('/api/vehicles', this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div className="column is-half mainInsertBody">
        <form onSubmit={this.handleSubmit}>
          <h4 className="title is-4">Create New Vehicle</h4>
          <label className="subtitle is-5">
            Name:
            <input className="input is-primary" type="text" name="make" value={this.state.make} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Make:
            <input className="input is-primary" type="text" name="model" value={this.state.model} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Year:
            <input className="input is-primary" type="text" name="year" value={this.state.year} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Engine Size:
            <input className="input is-primary" type="text" name="engineSize" value={this.state.engineSize} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Fuel type:
            <input className="input is-primary" type="text" name="fuelType" value={this.state.fuelType} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Price:
            <input className="input is-primary" type="text" name="price" value={this.state.price} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Description:
            <input className="input is-primary" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <label className="subtitle is-5">
            Picture:
            <input className="input is-primary" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />
          </label>
          <input className="button is-primary" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateVehicle;
