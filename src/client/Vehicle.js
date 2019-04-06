import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './app.css';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class Vehicle extends React.Component {
  // define what happens when this componet gets drawn on the UI
  render() {

    return (
      <div className="card divPos">
        <div>
          <div>
            <figure>
              <img alt="Profile" src={this.props.picture} />
            </figure>
          </div>
          <div>
            <div>
              <div>
                <p><b>Make:</b> {this.props.make} {this.props.model}</p>
                <p><b>Year:</b> {this.props.year}</p>
                <p><b>Engine Size:</b> {this.props.engineSize}</p>
                <p><b>Fuel Type:</b> {this.props.fuelType}</p>
                <p><b>Price:</b> {this.props.price}</p>
                <p><b>Description:</b> {this.props.description}</p>
                <p><b>Inserted by User:</b>{this.props.userId}</p>
                <button
                  className="button is-danger"
                  type="button"
                  onClick={() => {
                    this.props.handleDelete(this.props.id);
                  }}
                >
                  Delete
                </button>
                <Link to={`/edit-vehicle/${this.props.id}`}>
                  <button className="button is-primary" type="button">Edit</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Vehicle;
