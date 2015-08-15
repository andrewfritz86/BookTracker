var React = require('react');



module.exports = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    //grab input values
    var author = React.findDOMNode(this.refs.author).value;
    var title = React.findDOMNode(this.refs.title).value;
    var pageCount = React.findDOMNode(this.refs.pageCount).value;
    var myThoughts = React.findDOMNode(this.refs.myThoughts).value;
    var genre = React.findDOMNode(this.refs.genre).value;
    var imageUrl = React.findDOMNode(this.refs.imageUrl).value;
    //send them up in a callback handed down via props
    this.props.sendUpNewBook({
      author: author,
      title: title,
      pageCount: pageCount,
      myThoughts: myThoughts,
      genre: genre,
      imageUrl: imageUrl
    });
    //reset inputs
    React.findDOMNode(this.refs.author).value = "";
    React.findDOMNode(this.refs.title).value = "";
    React.findDOMNode(this.refs.pageCount).value = "";
    React.findDOMNode(this.refs.myThoughts).value = "";
    React.findDOMNode(this.refs.genre).value = "";
    React.findDOMNode(this.refs.imageUrl).value = "";

  },
  handleFocus: function(event){
    console.log("handling focus");
    event.stopPropagation();
  },
  render: function(){
    return (
      <div className="form-container">
        <form className="book-form ui form moveup" onSubmit={this.handleSubmit}>
          <div className="field">
            <input type="text" ref="author" placeholder="author's name" onFocus={this.handleFocus}/>
          </div>
          <div className="field">
            <input type="text" ref="title" placeholder="book title" />
          </div>
          <div className="field">
            <input type="text" ref="pageCount" placeholder="page count" />
          </div>
          <div className="field">
            <input type="text" ref="myThoughts" placeholder="my thoughts..."/>
          </div>
          <div className="field">
            <input type="text" ref="genre" placeholder="genre"/>
          </div>
          <div className="field">
            <input type="text" ref="imageUrl" placeholder="image url"/>
          </div>
          <button type="submit" className="ui button green move">
            Add a Book.
          </button>
        </form>
      </div>
    );
  }
});