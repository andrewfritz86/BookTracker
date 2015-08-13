

//collection holding book models
var bookCollection = new Books();

//this is basically the container componenet for the entire application
var Header = React.createClass({
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

var BookContainer = React.createClass({
  //function that sets the initial state of the component, set once
  getInitialState: function(){
    console.log("grabbing initial state");
    return {data: []};
  },
  componentDidMount: function(){
    console.log("did mount fired")
    this.grabBooksFromServer();
    this.props.collection.on("remove",this.removeBookComponent.bind(this));
    setInterval(this.grabBooksFromServer, 2000);
  },

  removeBookComponent: function(){
    //grab updated state of models array from collection, set state of componeent ot that.
    this.setState({data: this.props.collection.toJSON()});

  },

  grabBooksFromServer: function(){
    //call fetch on collection as prop, use promise to setState of the data returned
    //save context for the callback, as opposed to binding it
    var that = this;
    this.props.collection.fetch().done(function(data){
      //set the state of the componenet to the data from the fetch
      that.setState({data:data});
      //add a listener for add events on the collectoin, this will fire the updateDom function
      //TODO: this is currently adding a new listener each time, should refactor this to be added 
      //when the component mounts
      that.props.collection.on("add",that.updateDom);
    });
  },

  updateDom: function(){
    //this function refetches the collection and sets the data property of the component state in the callback
    var that = this;
    this.props.collection.fetch().done(function(data){
      that.setState({data:data})  
    })
  },

  deleteBook: function(id){
    console.log("delete book function fired" + id);
    //remove model from collection? this should fire an event, can set a listener to rerender when delete event happens?
    //grab the model from the collection on props
    var model = _.find(this.props.collection.models,function(book){
                    return(book.id === id);
                  });
    var deleteMe = this.props.collection.remove(model);
    deleteMe.deleteBook();
  },
  //callback that will POST data to server, can be sent down to the form via props
  sendNewBookToServer: function(bookData){
    var that = this;
    $.ajax({
      type: "post",
      url: this.props.url,
      data: bookData
    }).done(function(data){
      that.props.collection.add(data);
    });

  },
  render: function(){
    return (
      <div className="book-container">
        <BookList className="book-list" data={this.state.data} deleteBook={this.deleteBook}/>
        <BookForm sendUpNewBook={this.sendNewBookToServer}/>
      </div>
    );
  }
});


var BookList = React.createClass({
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


var Book = React.createClass({

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



















React.render(<Header url="books" collection={bookCollection}/>, document.getElementById("main"));









