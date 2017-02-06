(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react-router'), require('mongodb'), require('react'), require('graphql'), require('compression'), require('express'), require('express-graphql'), require('path'), require('react-dom/server')) :
  typeof define === 'function' && define.amd ? define(['react-router', 'mongodb', 'react', 'graphql', 'compression', 'express', 'express-graphql', 'path', 'react-dom/server'], factory) :
  (factory(global.Route,global.MongoClient,global.React,global.graphql,global.compression,global.express,global.graphqlHTTP,global.path,global.reactDom_server));
}(this, (function (Route,MongoClient,React,graphql,compression,express,graphqlHTTP,path,reactDom_server) { 'use strict';

var Route__default = 'default' in Route ? Route['default'] : Route;
MongoClient = 'default' in MongoClient ? MongoClient['default'] : MongoClient;
React = 'default' in React ? React['default'] : React;
compression = 'default' in compression ? compression['default'] : compression;
express = 'default' in express ? express['default'] : express;
graphqlHTTP = 'default' in graphqlHTTP ? graphqlHTTP['default'] : graphqlHTTP;
path = 'default' in path ? path['default'] : path;

function sendQuery(query, callback) {
  fetch('/api', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ query: query })
  }).then(function (response) {
    return response.json().then(function (json) {
      callback(json.data);
    });
  });
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var VoteForm = function (_React$Component) {
  inherits(VoteForm, _React$Component);

  function VoteForm() {
    classCallCheck(this, VoteForm);

    var _this = possibleConstructorReturn(this, (VoteForm.__proto__ || Object.getPrototypeOf(VoteForm)).call(this));

    _this.state = {
      movies: []
    };
    return _this;
  }

  createClass(VoteForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      sendQuery('{getMovies {\n          _id\n          title\n      }}', function (data) {
        var movies = data.getMovies;
        _this2.setState({
          movies: movies
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var movies = this.state.movies;

      var movieList = movies.map(function (currMovie, movieNumber) {
        return React.createElement(Movie, { key: currMovie._id, value: currMovie.title });
      });

      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'text' }),
        React.createElement(
          'button',
          null,
          'Search'
        ),
        React.createElement(
          'div',
          null,
          movieList
        ),
        React.createElement(
          'button',
          null,
          'Vote'
        ),
        React.createElement(
          'button',
          null,
          'See Results'
        )
      );
    }
  }]);
  return VoteForm;
}(React.Component);

var Movie = function (_React$Component2) {
  inherits(Movie, _React$Component2);

  function Movie() {
    classCallCheck(this, Movie);
    return possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).apply(this, arguments));
  }

  createClass(Movie, [{
    key: 'render',
    value: function render() {
      var imageSource = 'https://images.vexels.com/media/users/3/130321/isolated/lists/ad5bee5bc7999f5b3c2a0fd59aba73c9-film-strip-icon.png';

      return React.createElement(
        'div',
        null,
        React.createElement('img', { src: imageSource }),
        React.createElement(
          'div',
          null,
          this.props.value
        )
      );
    }
  }]);
  return Movie;
}(React.Component);

var routes = React.createElement(Route__default, { path: '/', component: VoteForm });

// Webserver
var app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, 'www'), { index: false }));

app.get('*', function (req, res) {
  Route.match({ routes: routes, location: req.url }, function (err, redirect, props) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      var appHtml = reactDom_server.renderToString(React.createElement(Route.RouterContext, props));
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

function renderPage(appHtml) {
  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <title>Movie Night Vote</title>\n\n        <link rel="stylesheet" href="styles.css">\n\n        <script src="./external/react.js"></script>\n        <script src="./external/react-dom.js"></script>\n\n        <script src="bundle.js"></script>\n    </head>\n    <body>\n        <div id="root">' + appHtml + '</div>\n    </body>\n    </html>\n   ';
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log('Webserver running at localhost:' + PORT);
});

// app.use('/', express.static('www'));

// app.listen(8080, () => {
//   console.log('Server started on port 8080.');
// });

// MongoDB
var collection = void 0;
MongoClient.connect('mongodb://localhost:27017/movieNight', function (err, db) {
  if (err) {
    return console.dir(err);
  }

  console.log('Connected to MongodDB on port 27017.');

  collection = db.collection('movies');
});

// GraphQL API
var schema = graphql.buildSchema('\n  type Movie {\n    _id: String!\n    title: String\n  }\n  type Query {\n    getMovies: [Movie]\n  }\n');

var root = {
  getMovies: function getMovies() {
    return collection.find().toArray();
  }
};

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root
  //    graphiql: true
}));

})));
