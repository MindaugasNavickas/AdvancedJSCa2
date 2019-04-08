import React, { Component } from "react";
import Vehicle from "./Vehicle";
import CreateVehicle from "./CreateVehicle";
import axios from "axios";
import "./app.css";
import { Link } from "react-router-dom";
import App from "./App";
import withAuth from "./withAuth";

class VehicleList extends Component {
  constructor(props) {
    super(props);
    // store the array of users in state
    this.state = {
      vehicles: [],
      email: "",
      password: "",
      condition: false,
      loggedIn: false,
      canClick: false,
      userId: '',
      userName: ''
    };



    this.updateVehicles = this.updateVehicles.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    axios
      .get("api/logout")
      .then(res => {
        this.setState({ loggedIn: false });
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
    return null;
  }
  componentDidMount() {
    // when the component mounts, fetch the user data from the server
    this.updateVehicles();
  }
  handleClick = () => {
    this.setState(state => ({
      condition: !this.state.condition
    }));
    // console.log(this.state.buttonText);
  };

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/authenticate", this.state)
      .then(res => {
        if (res.status === 200) {
          // redirect to /
          // this.setState({userId: this.props.history.state._id});
          this.props.history.push("/");
          this.props.history.state = res.data;
          withAuth(this.setState(state => ({
            loggedIn: true,
            condition: false,
            canClick: true
            // userName: ''
          })));
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  }




  updateVehicles() {
    // make a GET request to the server for the user data, store it in state
    axios
      .get("/api/vehicles")
      .then(response => {
        this.setState({ vehicles: response.data });
        // console.log(response.data[0].userId);
        // axios                                    THIS AXIOS CALL WAS SUPPOSED TO SEND
        //   .get("/api/user", {                    A CALL TO GET A USER WITH SPECIFIC ID
        //     data: {                              WHICH WOULD THEN BE USED TO LINK
        //       id: response.data[0].userId        TO A VEHICLE AND DISPLAY USER NAME
        //     }                                    ON THE SCREEN
        //   })
        //   .then(response => {
        //     this.setState({ userName: response.data.name})
        //   })
        //   .catch(error => {
        //     console.log("Error gettin user name for vehicle " + error);
        //   });
      })
      .catch(error => {
        console.log(error);
      });

  }


  handleDelete(vehicleId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete("api/vehicles", {
        data: {
          id: vehicleId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        this.updateVehicles();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // for each user object, produce a User Component
    const vehiclesList = this.state.vehicles.map(v => (
      <Vehicle
        key={v._id}
        id={v._id}
        make={v.make}
        model={v.model}
        year={v.year}
        engineSize={v.engineSize}
        fuelType={v.fuelType}
        price={v.price}
        description={v.description}
        picture={v.picture}
        handleDelete={this.handleDelete}
        userId={v.userId}
      />
    ));
    return (
      <div>
        <nav
          className="navbar columns is-four-fifths navBar2"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
                {this.state.canClick ? (
                  <Link
                    to="/create-vehicle"
                    className="navbar-item is-static"
                  >
                    Add Vehicle
                  </Link>
                ) : (
                  <a className="navbar-item disabledCursor">Add Vehicles</a>
                )}
            </div>

            <div className="navbar-end">
              <a
                className={
                  this.state.loggedIn ? "navbar-item afterLogin" : "navbar-item"
                }
                onClick={this.handleClick}
              >
                Log In
              </a>
              <Link
                to="/register"
                className={
                  this.state.loggedIn ? "navbar-item afterLogin" : "navbar-item"
                }
              >
                Register
              </Link>
              <Link
                to="/"
                className={
                  this.state.loggedIn ? "navbar-item" : "navbar-item afterLogin"
                }
              onClick={this.logout}>
                Log out
              </Link>
              <div className="navbar-item">
                <div className="buttons">
                  <div className="field">
                    <div className="control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav
          className={
            this.state.condition
              ? "navbar columns is-four-fifths navBar2"
              : "navbar columns is-four-fifths navBar2 showLogin"
          }
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start" />

            <div className="navbar-end">
              <form onSubmit={this.onSubmit}>
                <h1>Login Work in progress.....</h1>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <input type="submit" value="Submit" />
              </form>

              <div className="navbar-item">
                <div className="buttons">
                  <div className="field">
                    <div className="control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="columns">
          <div className="column is-four-fifths mainBody">
            <div>{vehiclesList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleList;
