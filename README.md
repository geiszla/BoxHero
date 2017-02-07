# WebApp Template
A Node.js WebApp template using React

**Table of contents**
* [Setting up](#setting-up)
* [Development](#development)
* [Project Structure](#project-structure)

This document contains setup instructions for a previous version of this project. There could be some differences which can cause errors during install. Instructions will be updated soon...


## Setting up
### Install server
1. Download or clone project source.
2. Unzip files to any directory.
3. Install latest version of Node.js with default settings (https://nodejs.org/en/download/).
4. Install latest Yarn Package Manager release with default settings (https://github.com/yarnpkg/yarn/releases).
5. Navigate to unzipped project files using a command line utility.
6. Enter "yarn install" to install all dependencies of the project (use "yarn install --production" for production use if development dependencies are not needed).
7. Enter "npm install -g nodemon" to install node monitoring utility (automatically restarts Node.js server when a file is modified).

### Set up development environment
1. Enter "npm install -g standard-react" to install linter module (you don't need this if you are using Visual Studio Code's builtin ESLint linter (see install instructions below)).
2. Optionally install some of the development tools below.

#### Install LivePage chrome extension (optional)
LivePage automatically reloads the page when the application is updated.

1. Download source code of latest release of LivePage (https://github.com/MikeRogers0/LivePage/releases)
2. Unzip files to any folder.
3. Open chrome extensions page (chrome://extensions/).
4. Tick the box next to "Developer mode" option on the top right corner of the page.
5. Click "Load unpacked extension..." button.
6. Select the unzipped LivePage folder.
7. To use it select the tab containing the application and click on the LivePage icon on the chrome extension bar.

#### Install Visual Studio Code (optional)
Visual Studio Code is a text editor that provides useful tools for easy JavaScript and React development.

1. Download and install Visual Studio Code with default settings (https://code.visualstudio.com/).
2. Open project folder inside Visual Studio Code by clicking File->"Open Folder..." or by right clicking on the folder in Windows Explorer and clicking "Open with Code".
3. If terminal is not open in the bottom of the text editor pane open it by selecting View->"Integrated Terminal" menu option.
4. Install "ESLint" by selecting View->Extensions and typing it into the search field.
5. Optionally set up key binding for linting the project. Select File->Preferences->"Keyboard Shortcuts" and copy the following into the right window pane (user settings) replacing the shortcut with the chosen one.

```json
[
{ "key": "ctrl+e d",              "command": "eslint.executeAutofix" }
]
```

## Development
### Without Visual Studio Code
#### Start server
1. Navigate to the project files using a command line utility.
2. Enter "npm start" to start the server.
3. Open a web browser and navigate to "[http://localhost:8080/](http://localhost:8080/)" to access the webapp.
4. Optionally turn on LivePage extension by clicking on its icon in the chrome extenstion bar (see install instructions above).

#### Start editing
1. Navigate to the project files using a command line utility.
2. Enter "npm run edit" to start monitoring the changes in code and automatically regenerate the application for the server.
3. Before every git push enter "standard-react --fix" to fix syntactic and semantic errors in JavaScript files (may have to run the command multiple times to fix all issues).
4. Fix other issues, which couldn't be automatically solved, reported by the prevoius command.

### With Visual Studio Code
See set up instructions above.

#### Start server
1. Open project folder inside Visual Studio Code by clicking File->"Open Folder..." or by right clicking on the folder in Windows Explorer and clicking "Open with Code".
2. If terminal is not open in the bottom of the text editor pane open it by selecting View->"Integrated Terminal" menu option.
3. In the terminal enter "npm start" to start the server.
4. Open a web browser and navigate to "[http://localhost:8080/](http://localhost:8080/)" to access the webapp.
5. Optionally turn on LivePage extension by clicking on its icon in the chrome extenstion bar (see install instructions above).

#### Start editing
1. In Visual Studio Code click on the "+" icon in the terminal pane to open a new terminal.
2. Enter "npm run edit" to start monitoring the changes in code and automatically regenerate the application for the server.
3. Before every git push use the previously set up key shortcut to lint the current file and fix syntactic and semantic errors in JavaScript files (may have to run the command multiple times to fix all issues).
4. Fix other issues, which couldn't be automatically solved, reported by the prevoius command.
5. Repeat linting with all modified files.

## Project Structure
This is a previous version of the project structure. Will be updated soon...

* node_modules

   Node.js modules used by our project. They are listed in package.json under "dependencies" and "devDependencies" sections and are automatically fetched by the "yarn install" command (they shouldn't be modified manually).

* src

   Source files of the user interface mainly consisting of react code.

  * components

     The react elements are defined here. hi.js contains the definition of a simple react component.

  * main.js

     JavaScript code that's run first and loads and runs the react elements.

  * test.js

     A sample react file that defines a page.

* www

   Files that will be sent to the client the first time it visits the webapp. They are generated from the source files in the "src" folder by the make.js script.

   * index.html

      The frame of the webapp consisting of only a basic html frame and the include of the react framework files and bundle.js.

  * bundle.js

     JavaScript code that generates each page of the webapp dinamically when the user navigates on it.

  * external

    Don't worry about it, we probably won't need it...

* .babelrc

   Configuration file for the babel node module which generates bundle.js from the react code.

* .eslintrc

  Configuration file for the linter. It specifies the coding standard and the rules of it.

* index.js

   JavaScript code that describes the working of the webserver and sends the generated index.html and bundle.js files to the client on request. Runs first when the server is started (by "npm start" command).

* make.js

   Code that generates the bundle.js by translating and packing the react elements together. If "npm run edit" command is used it runs every time the code changes updating the bundle.js file.

* package.json

   Contains the properties and dependencies of the project.

* yarn.lock

   File generated by Yarn Package Manager describing modules and their dependencies. Shouldn't be modified manually.
