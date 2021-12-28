const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// imports the API from the routes/api folder
const admin = require('./routes/api/admins')
const client = require('./routes/api/clients')
const commande = require('./routes/api/commandes')
const panier = require('./routes/api/paniers')
const region = require('./routes/api/regions')
const vins = require('./routes/api/vins')

// initializes the express application
const app = express()

// sets up CORS for Cross-Origin-Resource-Sharing
app.use(cors())

// converts API responses to JSON for easy use
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// imports our database credentials (stored separately for security)
const db = require('./config/keys').mongoURI

// initializes our database using the credentials
 mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// creates a route where we can interact with our API
app.use('/api/admin', admin)
app.use('/api/client', client)
app.use('/api/commande', commande)
app.use('/api/panier', panier)
app.use('/api/region', region)
app.use('/api/vins', vins)


// sets the port number depending if we are in production or development
const port = process.env.PORT || 5000

// intializes the server and logs a message
server = app.listen(port, () => console.log(`Server running on port ${port}`))