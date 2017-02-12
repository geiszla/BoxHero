import { Schema, mongoose } from 'mongoose';

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
  boxesFound: [
    {
      id: String,
      foundDate: { type: Date, default: Date.now }
    }
  ]
});

userSchema.methods.findBoxesFound = () => {
  return this.model('Box').find({
    _id: {
      $in: {
        $unwind: '$boxesFound.id'
      }
    }
  });
};

export const User = mongoose.model('User', userSchema);

// Boxes
const boxSchema = new Schema({
  location: {
    lattitude: Number,
    longitude: Number
  },
  shortId: String,
  content: String
});
export const Box = mongoose.model('Box', boxSchema);
