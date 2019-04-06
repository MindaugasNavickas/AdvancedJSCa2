import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import CreateVehicle from './CreateVehicle';
import EditVehicle from './EditVehicle';
import VehicleList from './VehicleList';
import Register from './Register';
import withAuth from './withAuth';


// 'main' Component. Sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        <Route exact path="/" component={VehicleList}/>
        <Route path="/edit-vehicle/:id" component={EditVehicle}/>
        <Route path="/create-vehicle" component={withAuth(CreateVehicle)}/>
        <Route path="/register" component={Register}/>
      </div>
    </HashRouter>
  );
};

export default App;
