var React = require("react");
var Header = require("./header");


var bookCollection = new Books();
React.render(<Header url="books" collection={bookCollection}/>, document.getElementById("main"));
