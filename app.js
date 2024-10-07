const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');  // Correct path

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://waheed123:waheed123@nodejs.gnz0q.mongodb.net/nodejs?retryWrites=true&w=majority&appName=nodejs';
mongoose.connect(dbURI)
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch((err) => console.log('Database connection error:', err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// blog routes
app.use('/blogs', blogRoutes);

// home route
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

