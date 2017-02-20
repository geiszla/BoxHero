import mongoose, { Schema, model } from 'mongoose';

mongoose.Promise = global.Promise;

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
    _id: { type: Schema.ObjectId, ref: 'Box' },
    foundDate: { type: Date, default: Date.now }
  }]
});

userSchema.statics.addBox = (userId, boxId) => {
  const boxObject = {
    _id: boxId
  };

  return User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { boxesFound: boxObject } },
      { upsert: true, new: true }
  );
};

userSchema.query.boxesFound = (firstName) => {
  return User.findOne({ 'name.first': firstName });
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

boxSchema.query.byIds = (boxArray, callback) => {
  Box.find({ _id: { $in: boxArray } }, callback);
};

export const Box = model('Box', boxSchema);

// Movies
const movieSchema = new Schema({
  title: String
});

export const Movie = model('Movie', movieSchema);
