import { RouterContext, match } from 'react-router';

import MongoClient from 'mongodb';
import React from 'react';
import { buildSchema } from 'graphql';
import compression from 'compression';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import path from 'path';
import { renderToString } from 'react-dom/server';
import routes from './src/routes';

// Webserver
const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, 'www'), {index: false}));

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

function renderPage (appHtml) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Movie Night Vote</title>

        <link rel="stylesheet" href="styles.css">

        <script src="./external/react.js"></script>
        <script src="./external/react-dom.js"></script>

        <script src="bundle.js"></script>
    </head>
    <body>
        <div id="root">${appHtml}</div>
    </body>
    </html>
   `;
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log('Webserver running at localhost:' + PORT);
});

// MongoDB
let collection;
MongoClient.connect('mongodb://boxhero:BoxHeroY4@ds011374.mlab.com:11374/boxhero', function (err, db) {
  if (err) { return console.dir(err); }

  console.log('Connected to MongodDB.');

  collection = db.collection('movies');
});

// GraphQL API
const schema = buildSchema(`
  type Movie {
    _id: String!
    title: String
  }
  type Query {
    getMovies: [Movie]
  }
`);

var root = {
  getMovies: () => {
    return collection.find().toArray();
  }
};

app.use('/api',
  graphqlHTTP({
    schema: schema,
    rootValue: root
//    graphiql: true
  })
);
