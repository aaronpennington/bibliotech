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

    var index = 0;


    $($results).each(function () {
      $("#ulSearchResults").append("<div class='row justify-content-start' id='row'>");
      console.log("ITERATE!");
      $(this).find("results>work>best_book").each(function () {
        var tempTitle = $(this).find("title").text();
        var tempAuthor = $(this).find("author>name").text();
        var tempId = $(this).find("id").text();

        // Try to get the largest available book cover image. 
        var tempImage = $(this).find("large_image_url").text();
        if (tempImage == "") {
          tempImage = $(this).find("image_url").text();
          if (tempImage == "") {
            tempImage = $(this).find("small_image_url").text();
          }
        }
        console.log("*****");
        console.log("TITLE: " + tempTitle);
        console.log("AUTHOR: " + tempAuthor);

        // var rIndex = "#row" + (index / 3);

        // if (index == 0) {
        //   $("#ulSearchResults").append("<div class='row' id='row" + index / 3 + "'>");
        // } else if (index % 3 == 0 && index > 0) {
        //   $("#ulSearchResults").append("</div><div class='row' id='row" + index / 3 + "'>");
        //   console.log("Break here @ index=" + index);
        // }

        $("#row").append("<div class='col-4'><div class='card' style='width: 15rem'><img src=" + tempImage + " class='card-img-top' alt='" + tempTitle + "'><div class='card-body'><h5 class='card-title'>" + tempTitle + "</h5> <p class='card-text'>" + tempAuthor + "</p><br><button type='button' onclick='addBook(" + tempId + ")'>Add to Shelf</button></div></div></div>");

        index = index + 1;
        console.log(index);
      });
      $("#ulSearchResults").append("</div>");
    })
  })
}

function getShelf() {
  $("#shelf").empty();
  var shelf = $("#selectShelf :selected").val();
  console.log("SHELF VALUE: " + shelf);
  $.get("/review/list", {
    shelf: shelf
  }, function (xmlData) {
    var data = $.parseXML(xmlData);
    $xml = $(data);
    $reviews = $xml.find("reviews");
    console.log("Recieved this data: ");
    console.log(data);

    $($reviews).each(function () {
      $("#shelf").append("<div class='row justify-content-start' id='shelfRow'>");
      $(this).find("review>book").each(function () {
        var title = $(this).find("title").text();
        var image = $(this).find("large_image_url").text();
        if (image == "") {
          image = $(this).find("image_url").text();
          if (image == "") {
            image = $(this).find("small_image_url").text();
          }
        }
        var author = $(this).find("authors>author>name").text();
        console.log("TITLE: " + title);
        $("#shelfRow").append("<div class='col-4'><div class='card' style='width: 15rem'><img src=" + image + " class='card-img-top' alt='" + title + "'><div class='card-body'><h5 class='card-title'>" + title + "</h5> <p class='card-text'>" + author + "</p></div></div></div>");
      })
    })
  })
}

function getShelfList() {
  $.get("/shelf/list", function (xmlData) {
    var data = $.parseXML(xmlData);
    console.log(data);
    $xml = $(data);
    $response = $xml.find("shelves>user_shelf");

    $($response).each(function () {
      var shelf_name = $(this).find("name").text();
      $("#selectShelf").append("<option value=" + shelf_name + ">" + shelf_name + "</option>");
    })
  })
}

function addBook(book_id) {
  $.post("/shelf/add_to_shelf", {
    book_id: book_id
  })
  console.log("Posted book with id " + book_id);
}