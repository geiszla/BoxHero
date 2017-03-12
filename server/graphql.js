import { Box, User } from './mongoose';
import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

// Viewer
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    username: {
      type: GraphQLString
    }
  }
});

// Boxes
const locationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    lattitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat }
  }
});

const locationInputType = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: {
    lattitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat }
  }
});

const boxType = new GraphQLObjectType({
  name: 'Box',
  fields: {
    shortId: { type: GraphQLString },
    location: { type: locationType }
  }
});

const boxWithFoundDateType = new GraphQLObjectType({
  name: 'BoxWithFoundDate',
  fields: {
    shortId: {
      type: GraphQLString,
      resolve: root => root._id.shortId
    },
    location: {
      type: locationType,
      resolve: root => root._id.location
    },
    foundDate: { type: GraphQLString }
  }
});

function generateShortId () {
  const currId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  return new Promise((resolve) => {
    Box.findOne({ _id: currId }, (_, obj) => {
      if (obj === null) {
        resolve(currId);
      } else {
        generateShortId().then((id) => {
          resolve(id);
        });
      }
    });
  });
}

// Users
const nameType = new GraphQLObjectType({
  name: 'Name',
  fields: {
    first: { type: GraphQLString },
    last: { type: GraphQLString }
  }
});

const nameInputType = new GraphQLInputObjectType({
  name: 'NameInput',
  fields: {
    first: { type: GraphQLString },
    last: { type: GraphQLString }
  }
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: nameType },
    registered: { type: GraphQLString },
    loggedIn: { type: GraphQLString },
    boxesFound: { type: new GraphQLList(boxType) }
  }
});

const toRadian = function (degrees) {
  return degrees * Math.PI / 180;
};

// Queries
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (root) => {
        console.log(root.session);
        return {
          username: root.session
        };
      }
    },
    getUserStats: {
      type: userType,
      resolve: () => {
        return new Promise((resolve) => {
          User.find().populateBoxes((user) => {
            resolve(user);
          });
        });
      }
    },
    getBoxesFound: {
      type: new GraphQLList(boxWithFoundDateType),
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { username }) => {
        return new Promise((resolve) => {
          User.find().boxesFound(username, (boxesFound) => {
            resolve(boxesFound);
          });
        });
      }
    },
    searchForUsers: {
      type: new GraphQLList(userType),
      args: {
        query: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { query }) => {
        return new Promise((resolve) => {
          User.find({ 'username': { $regex: '.*' + query + '.*' } }, (_, users) => {
            resolve(users);
          });
        });
      }
    },
    searchForBoxes: {
      type: new GraphQLList(boxType),
      args: {
        query: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { query }) => {
        return new Promise((resolve) => {
          Box.find({ 'shortId': { $regex: '.*' + query + '.*' } }, (_, boxes) => {
            resolve(boxes);
          });
        });
      }
    },
    getClosestOrDefaultBoxes: {
      type: new GraphQLList(boxType),
      args: {
        lattitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat }
      },
      resolve: (_, { lattitude, longitude }) => {
        return new Promise((resolve) => {
          if (lattitude === null || longitude === null) {
            Box.find({}, {}, { limit: 3 }, (_, boxes) => {
              resolve(boxes);
            });
          } else {
            Box.find({}, (_, boxes) => {
              const boxDistances = boxes.map((box, index) => {
                const R = 6371e3; // Earth radius in metres
                const dLat = toRadian(box.location.lattitude - lattitude);
                const dLon = toRadian(box.location.longitude - longitude);
                const lat1 = toRadian(lattitude);
                const lat2 = toRadian(box.location.lattitude);

                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                return { distance: R * c, index: index };
              });

              boxDistances.sort((a, b) => {
                const aValue = a.distance;
                const bValue = b.distance;

                if (aValue > bValue) {
                  return 1;
                } else if (aValue === bValue) {
                  return 0;
                } else {
                  return -1;
                }
              });

              let closestBoxes = [];
              for (let i = 0; i < 3; i++) {
                closestBoxes.push(boxes[boxDistances[i].index]);
              }

              resolve(closestBoxes);
            });
          }
        });
      }
    }
  }
});

// Mutations
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        name: { type: nameInputType }
      },
      resolve: (_, { username, email, name }) => {
        return new Promise((resolve) => {
          const newUser = new User({
            username: username,
            email: email,
            name: name
          });

          newUser.save((err) => {
            if (err) {
              console.log('Couldn\'t add user to database.');
              resolve(null);
            } else {
              root.session._id = newUser._id;
              resolve(newUser);
            }
          });
        });
      }
    },
    loginUser: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: (root, { email, password }) => {
        return new Promise((resolve) => {
          User.findOneAndUpdate(
            { email: email },
            { loggedIn: Date.now() },
            (err, obj) => {
              if (err) console.log('Search for user in database failed.');

              if (obj !== null) {
                root.session._id = obj._id;
                resolve('logged_in');
              } else {
                resolve('not_registered');
              }
            });
        });
      }
    },
    addBox: {
      type: boxType,
      args: {
        location: { type: locationInputType },
        foundDate: { type: GraphQLString }
      },
      resolve: (_, { location, foundDate }) => {
        return new Promise((resolve) => {
          generateShortId().then((shortId) => {
            const newBox = new Box({
              location: location,
              shortId: shortId,
              content: ''
            });

            newBox.save((err) => {
              if (err) {
                console.log('Couldn\'t add user to database.');
                resolve(null);
              } else {
                resolve(newBox);
              }
            });
          });
        });
      }
    },
    assignBox: {
      type: userType,
      args: {
        userId: { type: GraphQLString },
        boxId: { type: GraphQLString }
      },
      resolve: (_, { userId, boxId }) => {
        return new Promise((resolve) => {
          User.addBox(userId, boxId).then((user) => {
            resolve(user);
          });
        });
      }
    }
  }
});

export default new GraphQLSchema({ query: queryType, mutation: mutationType });
