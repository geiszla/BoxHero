# BoxHero
A Node.js WebApp using React

**Table of contents**
* [Setting up](#setting-up)
* [Usage](#usage)
* [Project Structure](#project-structure)

## Setting up
### Install server
1. Download or clone project source.
2. Unzip files to any directory.
3. Install latest version of Node.js with default settings (https://nodejs.org/en/download/). On Linux, you may need to add the node/bin folder to the path manually.
4. Install latest Yarn Package Manager release with default settings (https://yarnpkg.com/lang/en/docs/install/).
5. Navigate to unzipped project files using a command line utility.
6. Enter "yarn install" to install all dependencies of the project.
7. Enter "npm install -g nodemon" to install node monitoring utility (automatically restarts Node.js server when a file is modified).

### Set up development environment
1. Enter "npm install -g standard-react" to install linter module (you don't need this if you are using Visual Studio Code's built-in ESLint linter (see setup instructions below)).
2. Optionally install some of the development tools below.

#### Install LivePage Chrome extension (optional)
LivePage automatically reloads the page when the application is updated.

1. Download source code of latest release of LivePage (https://github.com/MikeRogers0/LivePage/releases)
2. Unzip files to any folder.
3. Open Chrome extensions page (chrome://extensions/).
4. Tick the box next to "Developer mode" option on the top right corner of the page.
5. Click "Load unpacked extension..." button.
6. Select the unzipped LivePage folder.
7. To use it select the tab containing the application and click on the LivePage icon on the Chrome extension bar.

#### Install Visual Studio Code (optional)
Visual Studio Code is a text editor that provides useful tools for easy JavaScript and React development.

1. Download Visual Studio Code and install it with default settings (https://code.visualstudio.com/).
2. Open project folder inside Visual Studio Code by clicking File > "Open Folder..." or by right clicking on the folder in Windows Explorer and clicking "Open with Code".
3. If terminal is not open in the bottom of the text editor pane, open it by selecting View > "Integrated Terminal" menu option.
4. Install "ESLint" by selecting View > Extensions and typing it into the search field.
5. Optionally set up a key shortcut for linting. Select File > Preferences > "Keyboard Shortcuts" and copy the following into the right window pane (user settings) replacing the key with the chosen one.

```json
[
{ "key": "ctrl+e d",              "command": "eslint.executeAutofix" }
]
```

#### Install React Developer Tools Chrome Extension (optional)
Adds React debugging tools to the Chrome Developer Tools.

1. Install React Developer Tools Chrome Extension from the [Chrome Extensions website] (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
2. To use it open Chrome Developer Tools (while the tab with the developed website is selected) by pressing the "F12" key or by right clicking the page followed by "Inspect" option.
3. In Chrome Developer Tools select "React" tab.

## Usage
### Without Visual Studio Code
#### Start server
1. Navigate to the project files using a command line utility.
2. Enter "yarn start" to start the server.
3. If you install the server for production use (i.e. you don't want to edit the webapp) open a new terminal, navigate to the project files and enter "node build_client.js". Then jump to "[Visit website](#visit-the-website)" section.

#### Start editing
1. Navigate to the project files using a command line utility.
2. Enter "yarn run edit" to start monitoring the changes in code and automatically regenerate the application for the server.
3. Before every git push enter "standard-react --fix" to fix syntactic and semantic errors in JavaScript files (may have to run the command multiple times to fix all issues).
4. Fix other issues, which couldn't be automatically solved, reported by the previous command.
5. Optionally turn on LivePage extension by clicking on its icon in the chrome extenstion bar (see install instructions above).

### With Visual Studio Code
See setup instructions above.

#### Start server
1. Open project folder inside Visual Studio Code by clicking File > "Open Folder..." or by right clicking on the folder in Windows Explorer and clicking "Open with Code".
2. If terminal is not open in the bottom of the text editor pane open it by selecting View > "Integrated Terminal" menu option.
3. In the terminal enter "yarn start" to start the server.
4. If you install the server for production use (i.e. you don't want to edit the webapp) open a new terminal, navigate to the project files and enter "node build_client.js". Then jump to "[Visit website](#visit-the-website)" section.

#### Start editing
1. In Visual Studio Code click on the "+" icon in the terminal pane to open a new terminal.
2. Enter "yarn run edit" to start monitoring the changes in code and automatically regenerate the application for the server.
3. Before every git push use the previously set up key shortcut to lint the current file and fix syntactic and semantic errors in JavaScript files (may have to run the command multiple times to fix all issues).
4. Fix other issues, which couldn't be automatically solved, reported by the previous command.
5. Repeat linting with all modified files.
6. Optionally turn on LivePage extension by clicking on its icon in the chrome extenstion bar (see install instructions above).

### Visit the website
Open a web browser and navigate to "[http://localhost:8080/](http://localhost:8080/)" to access the webapp.

## Project Structure
* node_modules

   Node.js modules used by our project. They are listed in package.json under "dependencies" and "devDependencies" sections and are automatically fetched by the "yarn install" command (they shouldn't be modified manually).

* server

   Code of the backend. They are packed together into server.bundle.js.

  * graphql.js

     All the GraphQL types and schemas are defined here. They hold information on how to respond to requests from the GraphQL frontend.

  * mongoose.js

     Mongoose schemas and models are defined here. They specify how data in the MongoDB database looks like and how to get/insert/update data when a GraphQL query is serviced.

  * server.jsx

     JavaScript code that describes the working of the webserver and sends the generated index.html and bundle.js files to the client on request.

* src

   Source files of the frontend mainly consisting of React and JavaScript code.

  * components

     Each page is defined here (they are written in React). The "routes.js" file contains the routing information of the pages (the structure of the website).

  * styles

     Contains the styles of the website (written in stylus). It's compiled to CSS code during client compilation (see build_client.js).

  * graphql.js

     Handles the request and response to/from the GraphQL backend (e.g. to fetch data from the database).

  * index.jsx

     Renders the React document starting with the entry "Router" object (which handles the navigation between pages).

* www

   Files that will be sent to the client the first time it visits the webapp. They are generated from the source files in the "src" folder by the build_client.js script.

  * external

    Contains libraries used by the application at runtime (e.g. React, MobX, etc.).

  * bundle.js

     JavaScript code that generates each page and element of the webapp dynamically when the user navigates on it.

  * styles.css

    Styles for the application compiled from the stylus files in "src/styles".

* .babelrc

   Configuration file for the babel node module which translates JSX code to JavaScript.

* .eslintrc

  Configuration file for the linter. It specifies the coding standard and the rules of it.

* build_client.js

   Code that generates "www/bundle.js" - by translating and packing the react elements together - and "www/styles.css". If "yarn run edit" command is used it runs every time the code changes updating the bundle.js file.

* build_server.js

  Code that generates server.bundle.js from server.js (to convert ES6 and JSX code in server.js to plain JavaScript so that it can be run by Node.js).

* jsconfig.json

   Contains JavaScript language service configuration options (used by e.g. Visual Studio Code).

* package.json

   Contains the properties and dependencies of the project.

* server.bundle.js

   The generated server file. Runs first when the server is started (by "yarn start" command).

* yarn.lock

   File generated by Yarn Package Manager describing modules and their dependencies. Shouldn't be modified manually.
