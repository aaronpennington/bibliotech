function getAllBooks() {
  $("#ulBooks").empty();

  console.log("Getting books");

  $.get("/list", function (data) {
    console.log("Got list from server:");
    console.log(data);

    for (var i = 0; i < data.list.length; i++) {
      var book = data.list[i];

      $("#ulBooks").append("<li>" + book.title + " by " + book.full_name + "</li>");
    }
  })
}

function searchBook() {
  $("#ulSearchResults").empty();

  var title = $("#searchTitle").val();
  console.log("Searching for " + title);

  $.get("/search", {
    title: title
  }, function (xmlData) {
    var data = $.parseXML(xmlData);
    $xml = $(data);
    $results = $xml.find("search");
    console.log("Recieved this data: ");
    console.log(data);

    $($results).each(function () {
      $(this).find("results>work>best_book").each(function () {
        var tempTitle = $(this).find("title").text();
        var tempAuthor = $(this).find("author>name").text();
        console.log("TITLE: " + tempTitle);
        console.log("AUTHOR: " + tempAuthor);
        console.log("*****");

        $("#ulSearchResults").append("<li><b>" + tempTitle + "</b> by " + tempAuthor + "</li>");
      });
    })

  })
}