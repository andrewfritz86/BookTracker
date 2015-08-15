# BookTracker
An Application to Track Books I'm Reading.
Just an experiment, Backbone models, React Views.



#####Todo
- organize app
  src 
    - header.jsx
    - bookContainer.jsx
    - book.jsx
    - bookForm.jsx
    - booklist.jsx
    - app.jsx
  public
    javascripts
      - main.js
    stylsheets
      - style.css
  views
    - index.html
  server.js
  db
  gulpfile.js
  package.json


-how do we require backbone as well?
- if we just use module exports, it shouldn't be a problem
- however, current gulp task only touches jsx files, uses reactify etc, bb doesn't ened that
- maybe require backbone stuff normally with script tags ahead of the rest of the app, so that it's defined. should work