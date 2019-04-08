const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const withAuth = require('./middleware');

const app = express();

const secret = 'secret_should_not_be_in_git';
// const dbname = 'ReactCA2';



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const mongo_uri = 'mongodb+srv://Minde:Mindziukas1234@reactca2-gwl3h.mongodb.net/ReactCA2?retryWrites=true';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('dist'));


// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.get('/api/vehicles', (req, res) => {
  Vehicle.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/users', (req, res) => {
  User.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.delete('/api/vehicles', (req, res) => {
  Vehicle.deleteOne({_id:req.body.id }, err => {
    if (err) throw err;

    console.log('deleted from database');
    return res.send({ success: true });
  });
});


app.post('/api/vehicles', (req, res) => {
  console.log(req.body);
  const{ make, model, year, engineSize, fuelType, price, description, picture, userId } = req.body;
  const vehicle = new Vehicle({ make, model, year, engineSize, fuelType, price, description, picture, userId });
  vehicle.save(err =>{
    if (err) {
      res.status(500).send('Error inserting new vehicle please try again.');
    } else {
      res.status(200).send('Vehicle Inserted!');
    }
  });
});

app.get('/api/vehicle/:id', (req, res) => {
  Vehicle.findOne({_id: req.params.id }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

app.get('/api/user', (req, res) => {
  console.log('Req ' + req.body._id);
  User.findOne({_id: req.params.id }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});


app.put('/api/vehicles', (req, res) => {
  const id = req.body._id;
  delete req.body._id;
  Vehicle.updateOne({_id: id }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});


app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.post('/api/register', function(req, res) {
  const {name, email, password } = req.body;
  const user = new User({ name, email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true });
          res.status(200).send(user);
        }
      });
    }
  });
});
 
app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

app.listen(process.env.PORT || 8080);
