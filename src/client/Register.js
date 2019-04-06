import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email : '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error registering in please try again');
      });
  }

  render() {
    return (
      <div className="column is-half mainInsertBody">
        <form onSubmit={this.onSubmit}>
          <h4 className="title is-4">Register Below!</h4>
          <input
            className="input is-primary"
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
          <input
            className="input is-primary"
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email.toLowerCase()}
            onChange={this.handleInputChange}
            required
          />
          <input
            className="input is-primary"
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>

    );
  }
}
