import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import './middlewares/passport.js';
import indexRouter from './routes/index.js';

// constants
const DATABASE = process.env.DB_STRING;
const PORT = process.env.PORT || 3000;
const app = express();

// setup
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'banana',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // 1 hour
    },
  })
);
app.use(flash());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
app.use('/', indexRouter);

// database
mongoose
  .connect(DATABASE)
  .then((result) => {
    console.log('> Database connected');
    app.listen(PORT, () => console.log(`> App listening on ${PORT}`));
  })
  .catch((err) => console.log(err));
