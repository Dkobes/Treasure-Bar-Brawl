import { Character, Enemy, User } from '../models/index.js';
import { characters, enemies } from '../seeds/data.js';
import { signToken } from '../middleware/auth.js';

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(400).json({ message: 'Cannot find any users!' });
      return;
    }

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// get a single user by their username
export const getSingleUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      username: req.params.username,
    });
  
    if (!foundUser) {
      res.status(400).json({ message: 'Cannot find a user with this id!' });
      return;
    }
  
    res.json(foundUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// create a user, sign a token, and send it back (to StartMenu.jsx)
export const createUser = async (req, res) => {
  try {
    const party = await Character.insertMany(characters);
    const enemy = await Enemy.insertMany(enemies);
    const user = await User.create({ username: req.body.username, password: req.body.password, party: party, enemies: enemy });

    if (!user) {
      res.status(400).json({ message: 'Something is wrong!' });
      return;
    }

    const token = signToken(user.username, user.password, user._id);
    res.json({ token, user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// login a user, sign a token, and send it back (to StartMenu.jsx)
export const login = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};