import { Schema, model } from 'mongoose';

// Users
const userSchema = new Schema({
  username: String,
  email: String,
  name: {
    first: String,
    last: String
  },
  registered: { type: Date, default: Date.now },
  loggedIn: { type: Date, default: Date.now },
  // friends: [
  //   {
  //     id: String,
  //     friendsSince: { type: Date, default: Date.now }
  //   }
  // ],
  boxesFound: [{
    _id: { type: String, ref: 'Box' },
    foundDate: { type: Date, default: Date.now }
  }]
});

userSchema.query.boxesFound = (firstName, callback) => {
  User.findOne({ 'name.first': firstName }).populate('boxesFound._id').exec(callback);
};

export const User = model('User', userSchema);

// Boxes
const boxSchema = new Schema({
  location: {
    lattitude: Number,
    longitude: Number
  },
  shortId: String,
  content: String
});

export const Box = model('Box', boxSchema);

// Movies
const movieSchema = new Schema({
  title: String
});

export const Movie = model('Movie', movieSchema);
