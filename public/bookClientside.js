function getAllBooks() {
  console.log("Getting books");

  $.get("/list", function (data) {
    console.log("Got list from server:");
    console.log(data);

    for (var i = 0; i < data.list.length; i++) {
      var book = data.list[i];

      $("#ulBooks").append("<li>" + book.title + " by " + book.author + "</li>");
    }
  })
}