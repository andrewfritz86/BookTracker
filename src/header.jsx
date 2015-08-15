var React = require('react');
var BookContainer = require("./bookContainer");

module.exports = React.createClass({
  render: function(){
    return (
        <div className="main-header">
          <h1 className="headline ui green header">
            Reactive Book Tracker!
          </h1>
          <BookContainer url={this.props.url} collection={this.props.collection} />
        </div>
      );
  }
});