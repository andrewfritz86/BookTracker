var Book = Backbone.Model.extend({
  defaults: {
    author: "kralf"
  },
  url: "/books",
  deleteBook: function(){
    console.log(this.id);
    $.ajax({
      url: "/books/"+this.id,
      type: "delete"
    });
  }
})


var Books = Backbone.Collection.extend({
  model: Book,
  url: "/books"
})