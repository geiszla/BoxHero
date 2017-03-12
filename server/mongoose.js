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

userSchema.query.populateBoxes = (callback) => {
  User.findOne().populate('boxesFound._id').exec((_, user) => {
    callback(user);
  });
};

userSchema.statics.getBoxesFound = (username, callback) => {
  User.findOne({ 'username': username }).populate('boxesFound._id').exec((err, user) => {
    if (err) console.log('Couldn\'t find user in database.');
    callback(user.boxesFound);
  });
};

userSchema.statics.updateLoginDate = (userId) => {
  return User.findOneAndUpdate(
    { _id: userId },
    { loggedIn: Date.now() }
  );
};

userSchema.statics.addBox = (userId, boxId) => {
  const boxObject = {
    _id: boxId
  };

  return User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { boxesFound: boxObject } },
      { upsert: true }
  );
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
