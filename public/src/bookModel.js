var Book = Backbone.Model.extend({
  defaults: {
    author: "kralf"
  }
})


var Books = Backbone.Collection.extend({
  model: Book,
  url: "/books"
})