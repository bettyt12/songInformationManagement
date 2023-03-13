
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const SongRoute = require('./routes/SongRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect('mongodb+srv://testproject:testproject@cluster0.h3u0sok.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  });

  app.use('/api', SongRoute);

app.listen(5001, () => {
    console.log('Server started on port 5001');
  });




