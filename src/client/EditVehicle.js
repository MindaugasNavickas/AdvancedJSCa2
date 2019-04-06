import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditVehicle extends Component {
  constructor(props) {
    super(props);
    // store information relating to the user in state
    // should match the user object from the API
    this.state = {_id: '', make: '', model: '', year: '', engineSize: '', fuelType: '', price: '', description:'', picture: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // when this Component mounts, fetch data relating to the user to be edited
    // the user's ID is passed in via the URL and accessed via props
    axios.get('/api/vehicle/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          make: response.data.make,
          model: response.data.model,
          year: response.data.year,
          engineSize: response.data.engineSize,
          fuelType: response.data.fuelType,
          price: response.data.price,
          description: response.data.description,
          picture: response.data.picture,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // send a PUT request to the server
    // the request includes the state, which is the updated user information
    axios.put('/api/vehicles', this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div>
        <h2>Edit User</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="make" value={this.state.make} onChange={this.handleChange} />
          </label>
          <label>
            Make:
            <input type="text" name="model" value={this.state.model} onChange={this.handleChange} />
          </label>
          <label>
            Year:
            <input type="text" name="year" value={this.state.year} onChange={this.handleChange} />
          </label>
          <label>
            Engine Size:
            <input type="text" name="engineSize" value={this.state.engineSize} onChange={this.handleChange} />
          </label>
          <label>
            Fuel type:
            <input type="text" name="fuelType" value={this.state.fuelType} onChange={this.handleChange} />
          </label>
          <label>
            Price:
            <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <label>
            Picture:
            <input type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditVehicle;
