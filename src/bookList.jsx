var React = require("react");
var Book = require("./book");

module.exports = React.createClass({
  render: function(){
    var that = this;
    var myBooks = this.props.data.map(function(book){
      return (<Book deleteBook={that.props.deleteBook} id={book.id} author={book.author} title={book.title} myThoughts={book.myThoughts} pageCount={book.pageCount} author={book.author} genre={book.genre} imageUrl={book.imageUrl} />);
    })
    return (
      <div className="book-list">
        <h3 className="ui green header"> My Book List: </h3>
        {myBooks}
      </div>
    );
  }
});