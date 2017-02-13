import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { Movie, User } from './mongoose';

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
    shortId: {
      type: GraphQLString,
      resolve: root => root._id.shortId
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getBoxesFound: {
      type: new GraphQLList(boxType),
      args: {
        firstName: { type: GraphQLString }
      },
      resolve: (_, { firstName }) => {
        return new Promise((resolve) => {
          User.find().boxesFound(firstName, (err, user) => {
            if (err) console.log('Couldn\'t get boxes.');
            resolve(user.boxesFound);
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
