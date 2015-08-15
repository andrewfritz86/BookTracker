var React = require("react");


module.exports = React.createClass({

  handleDelete: function(event){
    this.props.deleteBook(this.props.id);
  },

  handleThoughts: function(event){
    $(event.target.parentElement.nextSibling).toggleClass("thoughts");
  },

  //this will be rendered as a semantic UI card
  render: function(){
    return (
      <div className="card-holder">
        <div className="ui card">
          <div className="image">
            <img src={this.props.imageUrl} />
          </div>
          <div className="content">
            <a className="header" onClick={this.handleThoughts}> {this.props.title} </a>
            <div className="thoughts">
              {this.props.myThoughts}
            </div>
            <div className="meta">
              <span className="date"> {this.props.author} </span>
            </div>
            <div className="meta">
              <span className="date"> {this.props.pageCount}  pages </span>
              <span className="date"> genre: {this.props.genre}   </span>
              <div className="delete-button" onClick={this.handleDelete}> Delete </div>
            </div>
            <div className="content">
              {this.props.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

