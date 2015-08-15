var React = require('react');
var BookList = require('./bookList');
var BookForm = require('./bookForm');




module.exports = React.createClass({
  //function that sets the initial state of the component, set once
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
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