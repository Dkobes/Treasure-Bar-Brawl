import { Character, Enemy, User } from '../models/index.js';
import { characters, enemies } from '../seeds/data.js';
import { signToken } from '../middleware/auth.js';

//get all users
export const getUsers = async (req, res) => {
  const users = await User.find({});

  if (!users) {
    res.status(400).json({ message: 'Cannot find any users!' });
    return;
  }

  res.json(users);
}

// get a single user by their username
export const getSingleUser = async (req, res) => {
  const foundUser = await User.findOne({
    username: req.params.username,
  });

  if (!foundUser) {
    res.status(400).json({ message: 'Cannot find a user with this id!' });
    return;
  }

  res.json(foundUser);
};

// create a user, sign a token, and send it back (to StartMenu.jsx)
export const createUser = async (req, res) => {
  const party = await Character.insertMany(characters);
  const enemy = await Enemy.insertMany(enemies);
  const user = await User.create({ username: req.body.username, password: req.body.password, party: party, enemies: enemy });

  if (!user) {
    res.status(400).json({ message: 'Something is wrong!' });
    return;
  }
  const token = signToken(user.username, user.password, user._id);
  res.json({ token, user });
};

// login a user, sign a token, and send it back (to StartMenu.jsx)
export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
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