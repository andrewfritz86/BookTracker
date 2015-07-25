var Header = React.createClass({
  render: function(){
    return (
        <div className="main-header">
          <h1 className="headline">
            Reactive Book Tracker!
            <BookContainer />
          </h1>
        </div>
      );
  }
});



var BookContainer = React.createClass({
  render: function(){
    return (
      <div className="book-container">
        <BookList />
      </div>
    );
  }
});


var BookList = React.createClass({
  render: function(){
    return (
      <div className="book-list">
        A list of book cards will be here eventually
      </div>
    );
  }
});



















React.render(<Header />, document.getElementById("main"));