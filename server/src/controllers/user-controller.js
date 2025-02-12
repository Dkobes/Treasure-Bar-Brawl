import express from 'express';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';

// get a single user by either their id or their username
export const getSingleUser = async (req, res) => {
  const foundUser = await User.findOne({
    $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
  });

  if (!foundUser) {
    res.status(400).json({ message: 'Cannot find a user with this id!' });
    return;
  }

  res.json(foundUser);
};

// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
export const createUser = async (req, res) => {
  const user = await User.create(req.body);

  if (!user) {
    res.status(400).json({ message: 'Something is wrong!' });
    return;
  }
  const token = signToken(user.username, user.password, user._id);
  res.json({ token, user });
};

// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
export const login = async (req, res) => {
  const user = await User.findOne({ $or: { username: req.body.username } });
  if (!user) {
    res.status(400).json({ message: "Can't find this user" });
    return;
  }

  const correctPw = await user.isCorrectPassword(req.body.password);

  if (!correctPw) {
    res.status(400).json({ message: 'Wrong password!' });
    return;
  }
  const token = signToken(user.username, user.password, user._id);
  res.json({ token, user });
};