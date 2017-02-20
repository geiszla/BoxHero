import { Box, Movie, User } from './mongoose';
import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const movieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString }
  }
});

const boxType = new GraphQLObjectType({
  name: 'Box',
  fields: {
    shortId: { type: GraphQLString }
  }
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    boxesFound: {
      type: new GraphQLList(boxType),
      resolve: (root) => {
        return new Promise((resolve) => {
          Box.find().byIds(root.boxesFound, (err, boxes) => {
            if (err) console.log('Couldn\'t populate boxes.');
            resolve(boxes);
          });
        });
      }
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getBoxesFound: {
      type: userType,
      args: {
        firstName: { type: GraphQLString }
      },
      resolve: (_, { firstName }) => {
        return new Promise((resolve) => {
          User.find().boxesFound(firstName).then((user) => {
            resolve(user);
          });
        });
      }
    },
    addBoxToUser: {
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
    },
    getMovies: {
      type: new GraphQLList(movieType),
      resolve: () => {
        return new Promise((resolve) => {
          Movie.find({}, (err, movies) => {
            if (err) console.log('Couldn\'t get movies.');
            resolve(movies);
          });
        });
      }
    }
  }
});

export default new GraphQLSchema({ query: queryType });
