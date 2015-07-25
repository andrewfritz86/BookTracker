

var Header = React.createClass({
  render: function(){
    return (
        <div className="main-header">
          <h1 className="headline">
            Reactive Book Tracker!
          </h1>
            <BookContainer data={this.props.data} url={this.props.url} />
        </div>
      );
  }
});



var BookContainer = React.createClass({
  //function that sets the initial state of the component, set once
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    //hit the server via ajax, set polling?
    this.grabBooksFromServer();
  },
  grabBooksFromServer: function(){
    //save context for the callback, as opposed to binding it
    var that = this;
    $.ajax({
      type: "get",
      url: this.props.url,
      dataType: "JSON"
    }).done(function(data){
      console.log(data);
      that.setState({data:data})
    });
  },
  render: function(){
    return (
      <div className="book-container">
        <BookList data={this.state.data}/>
      </div>
    );
  }
});


var BookList = React.createClass({
  render: function(){
    var myBooks = this.props.data.map(function(book){
      return (<Book author={book.author} title={book.title} myThoughts={book.myThoughts}/>);
    })
    return (
      <div className="book-list">
        <h3> My Book List: </h3>
        {myBooks}
      </div>
    );
  }
});


var Book = React.createClass({
  render: function(){
    return (
      <div className="book">
        <h4> {this.props.title} by {this.props.author} </h4>
        <h5> My thoughts </h5>
        <p> {this.props.myThoughts} </p>
      </div>
    );
  }
});



















React.render(<Header url="books"/>, document.getElementById("main"));