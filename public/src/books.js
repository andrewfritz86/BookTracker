
var booker = new Book()
var Header = React.createClass({
  render: function(){
    return (
        <div className="main-header">
          <h1 className="headline">
            Reactive Book Tracker!
          </h1>
          <BookContainer url={this.props.url} />
          <BackboneBook model={booker} />
        </div>
      );
  }
});

//react class that expects a backbone model for data.
var BackboneBook = React.createClass({
  componentDidMount: function(){
    var that = this;
    this.props.model.on("change", function(){
      that.handleDataChange();
    })
  },
  render: function(){
    return (
      <h1> {this.props.model.get("author")} </h1>
      );
  },

  handleDataChange: function(){
    this.forceUpdate();
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
    setInterval(this.grabBooksFromServer, 2000);
  },
  grabBooksFromServer: function(){
    //save context for the callback, as opposed to binding it
    var that = this;
    $.ajax({
      type: "get",
      url: this.props.url,
      dataType: "JSON"
    }).done(function(data){
      that.setState({data:data})
    });
  },
  //callback that will POST data to server, can be sent down to the form via props
  sendNewBookToServer: function(bookData){
    var that = this;
    $.ajax({
      type: "post",
      url: this.props.url,
      data: bookData
    }).done(function(data){
      that.setState({data: data})
    });

  },
  render: function(){
    return (
      <div className="book-container">
        <BookList data={this.state.data}/>
        <BookForm sendUpNewBook={this.sendNewBookToServer}/>
      </div>
    );
  }
});


var BookList = React.createClass({
  render: function(){
    var myBooks = this.props.data.map(function(book){
      return (<Book author={book.author} title={book.title} myThoughts={book.myThoughts} pageCount={book.pageCount} author={book.author} genre={book.genre} imageUrl={book.imageUrl} />);
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

  //this will be rendered as a semantic UI card
  render: function(){
    return (
      <div className="card-holder">
        <div className="ui card">
          <div className="image">
            <img src={this.props.imageUrl} />
          </div>
          <div className="content">
            <a className="header"> {this.props.title} </a>
            <div className="meta">
              <span className="date"> {this.props.author} </span>
            </div>
            <div className="meta">
              <span className="date"> {this.props.pageCount}  pages </span>
              <span className="date"> genre: {this.props.genre}   </span>
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





var BookForm = React.createClass({
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
      <form className="book-form ui form" onSubmit={this.handleSubmit}>
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
        <button type="submit" className="ui button">
          Add a Book.
        </button>
      </form>
    );
  }
});



















React.render(<Header url="books"/>, document.getElementById("main"));