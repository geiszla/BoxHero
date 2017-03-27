import mongoose, { Schema, model } from 'mongoose';

mongoose.Promise = global.Promise;

// Users
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  // name: {
  //   first: String,
  //   last: String
  // },
  registered: { type: Date, default: Date.now },
  loggedIn: { type: Date, default: Date.now },
  // friends: [
  //   {
  //     id: String,
  //     since: { type: Date, default: Date.now }
  //   }
  // ],
  boxesAdded: [{
    _id: { type: Schema.ObjectId, ref: 'Box' },
    addedDate: { type: Date, default: Date.now }
  }],
  boxesFound: [{
    _id: { type: Schema.ObjectId, ref: 'Box' },
    foundDate: { type: Date, default: Date.now }
  }]
});

userSchema.query.populateBoxes = (_id, callback) => {
  User.findOne({ _id: _id }).populate('boxesFound._id').exec((_, user) => {
    callback(user);
  });
};

userSchema.statics.getTopUsers = (callback) => {
  User.aggregate([
    { $project: {
      noOfBoxesFound: { $size: '$boxesFound' },
      document: '$$ROOT'
    }},
    { $sort: { noOfBoxesFound: -1 } }
  ]).limit(12).exec((err, users) => {
    if (err) console.log('Couldn\'t find top users in database.');
    callback(users);
  });
};

userSchema.statics.getBoxesFound = (username, callback) => {
  User.findOne({ 'username': username }).populate('boxesFound._id').exec((err, user) => {
    if (err) console.log('Couldn\'t find user in database.');
    callback(user.boxesFound);
  });
};

userSchema.statics.addBox = (userId, shortId, callback) => {
  Box.findOne({ shortId: shortId }, (err, box) => {
    if (err) console.log('Couldn\'t find box in database.');

    User.findOneAndUpdate(
      { _id: userId,
        'boxesFound._id': { $ne: box._id }
      },
      { $addToSet: { boxesFound: { _id: box._id } } },
      { new: true },
      callback
    );
  });
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
