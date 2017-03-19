import { RouterContext, match } from 'react-router';

import { Provider } from 'mobx-react';
import React from 'react';
import compression from 'compression';
import express from 'express';
import fs from 'fs';
import { getRoutes } from '../src/components/routes.jsx';
import graphQLSchema from './graphql';
import graphqlHTTP from 'express-graphql';
import http from 'http';
import https from 'https';
import mongoose from 'mongoose';
import path from 'path';
import { renderToString } from 'react-dom/server';
import session from 'express-session';

// HTTP Webserver
const unsecureApp = express();

unsecureApp.get('*', (req, res) => {
  res.redirect('https://localhost' + req.originalUrl);
});

http.createServer(unsecureApp).listen(8080);

//  HTTPS Webserver
const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, 'www'), { index: false }));
app.use(session({
  secret: 'boxhero-secret',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

app.use('/api',
  graphqlHTTP((req) => ({
    schema: graphQLSchema,
    rootValue: { session: req.session },
    graphiql: true
  })),
);

app.get('*', (req, res) => {
  const isLoggedIn = session.isLoggedIn === true;

  match({ routes: getRoutes(true, isLoggedIn), location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(
        <Provider isLoggedIn={isLoggedIn}>
          <RouterContext {...props} />
        </Provider>);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const externalDependencies = `
          <script src="https://unpkg.com/react@^15.4.2/dist/react.js"></script>
          <script src="https://unpkg.com/react-dom@^15.4.2/dist/react-dom.js"></script>
          <script src="https://unpkg.com/react-router@^3.0.2/umd/ReactRouter.js"></script>
          <script src="https://unpkg.com/react-bootstrap@^0.30.7/dist/react-bootstrap.js"></script>
          <script src="https://unpkg.com/react-router-bootstrap@^0.23.1/lib/ReactRouterBootstrap.js"></script>
          <script src="https://unpkg.com/mobx@^3.1.0/lib/mobx.umd.js"></script>
          <script src="https://unpkg.com/mobx-react@^4.1.0/index.js"></script>
          <script src="https://unpkg.com/google-map-react@^0.23.0/dist/GoogleMapReact.js"></script>
`;

function renderPage (appHtml) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    
      <meta charset="UTF-8">
      <meta name="google-signin-client_id" content="256326205648-jir98nj3b2uoo9o0uvfrp7m7hbrp516m.apps.googleusercontent.com">

      <title>BoxHero</title>

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="custom.css">
      <link rel="stylesheet" type="text/css" href="temp.css">

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

      <script type="text/javascript" src="map.js"></script> 
      <script async defer
      src="https://maps.googleapis.com/maps/api/js">
      </script>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      
      <script>
          window.fbAsyncInit = function() {
          FB.init({
              appId      : '426218011064795',
              xfbml      : true,
              version    : 'v2.8'
          });
          FB.AppEvents.logPageView();
          };

          (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
      </script>

       ${isProduction ? '' : externalDependencies}

      <script src="bundle.js"></script>
      
    </head>
    <body>

      <div id="root">${appHtml}</div>

    </body>
    </html>
   `;
}

var options = {
  key: fs.readFileSync(path.join(__dirname, 'server/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server/cert.pem'))
};
https.createServer(options, app).listen(443);

// MongoDB
const mongooseOptions = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

mongoose.connect('mongodb://boxhero:BoxHeroY4@ds011374.mlab.com:11374/boxhero', mongooseOptions, () => {
  console.log('Connected to MongoDB server.');
});
