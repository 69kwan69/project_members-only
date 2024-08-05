import { json, Router } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { body, validationResult, matchedData } from 'express-validator';
import { signupValidation } from '../middlewares/validation.js';
import upload from '../middlewares/multer.js';
import cloudinary from '../middlewares/cloudinary.js';
import User from '../models/User.js';
import Message from '../models/Message.js';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await Message.find().populate('user', 'username role');
  res.render('lobby', {
    title: 'Lobby',
    messages,
    errors: req.flash('error'),
  });
});

router.post(
  '/message',
  upload.single('photo'),
  body('message').trim().escape(),
  async (req, res) => {
    if (!req.user) return res.redirect('/login');

    const data = matchedData(req);
    if (req.file) {
      const cloud = await cloudinary.uploader.upload(req.file.path);

      if (data.message) {
        // Handle data with file AND message
        const message = new Message({
          type: 'mixed',
          user: req.user.id,
          content: data.message,
          attachment: cloud.secure_url,
        });
        await message.save();
      } else {
        // Handle data with file
        const message = new Message({
          type: 'image',
          user: req.user.id,
          content: cloud.secure_url,
        });
        await message.save();
      }
    } else if (data.message) {
      // Handle data with message
      const message = new Message({
        type: 'text',
        user: req.user.id,
        content: data.message,
      });
      await message.save();
    } else {
      // Handle no input
      req.flash('error', 'Nice try. Please enter your message properly.');
    }

    // redirect
    res.redirect('/');
  }
);

router.post('/delete', async (req, res) => {
  try {
    // Check authorization
    if (!req.user) return res.redirect('/login');
    else if (req.user.role !== 'admin') {
      req.flash(
        'error',
        'Nice try deleting. Contact admin to get authorization.'
      );
      return res.redirect('/');
    }

    // Get message Id
    const { id } = req.body;
    const result = await Message.findByIdAndDelete(id);
    res.json({ message: 'Message deleted.', redirect: '/' });
  } catch (error) {
    res.status(400).json({ message: 'Something is wrong, please try again.' });
  }
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

router.post(
  '/signup',
  // validation
  signupValidation(),
  async (req, res) => {
    // check validation
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.render('signup', { errors: result.array() });

    const data = matchedData(req);

    // check exist
    const isExist = await User.findOne({ username: data.username });
    if (isExist)
      return res.render('signup', { errors: [{ msg: 'Username taken' }] });

    // add to db
    data.password = await bcrypt.hash(data.password, 10);
    data.role = 'member';
    const user = new User(data);
    await user.save();

    // redirect
    res.redirect('/login');
  }
);

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', errors: req.flash('authentication') });
});

router.post(
  '/login',
  [body('username').trim().escape(), body('password').trim().escape()],
  passport.authenticate('local', {
    failureMessage: true,
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) next(err);
    res.redirect('/');
  });
});

export default router;
