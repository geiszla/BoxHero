import { RouterContext, match } from 'react-router';

import React from 'react';
import compression from 'compression';
import express from 'express';
import graphQLSchema from './graphql';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import path from 'path';
import { renderToString } from 'react-dom/server';
import routes from '../src/components/routes.jsx';

// Webserver
const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, 'www'), { index: false }));

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

const externalDependencies = `
          <script src="https://unpkg.com/react@^15.4.2/dist/react.js"></script>
          <script src="https://unpkg.com/react-dom@^15.4.2/dist/react-dom.js"></script>
          <script src="https://unpkg.com/react-router@3.0.2/umd/ReactRouter.js"></script>
          <script src="https://unpkg.com/react-bootstrap@0.30.7/dist/react-bootstrap.js"></script>
          <script src="https://unpkg.com/mobx@^3.1.0/lib/mobx.umd.js"></script>
          <script src="https://unpkg.com/mobx-react@^4.1.0/index.js"></script>
`;

function renderPage (appHtml) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Movie Night Vote</title>
        <link rel="stylesheet" href="styles.css">
        ${isProduction ? '' : externalDependencies}
        <script src="bundle.js"></script>
    </head>
    <body>
        <div id="root">${appHtml}</div>
    </body>
    </html>
   `;
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Webserver running at localhost:${PORT}`);
});

// MongoDB
mongoose.connect('mongodb://boxhero:BoxHeroY4@ds011374.mlab.com:11374/boxhero', () => {
  console.log('Connected to MongoDB server.');
});

// GraphQL
app.use('/api',
  graphqlHTTP({
    schema: graphQLSchema
//    graphiql: true
  }),
);
